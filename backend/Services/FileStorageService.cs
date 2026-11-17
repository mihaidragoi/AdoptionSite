
using Microsoft.EntityFrameworkCore;

public class FileStorageService(Db db, IWebHostEnvironment environment)
{
    private readonly string _uploadPath = Path.Combine(
        environment.ContentRootPath,
        "uploads"
    );

    private string ProfilePicturesPath => Path.Combine(
        _uploadPath,
        "profile_pictures"
    );

    public async Task<Result<bool>> UploadProfilePicture(int userId, IFormFile file)
    {
        var user = await db.Users.FindAsync(userId);

        if (user is null)
            return Result<bool>.Failure("UserNotFound");

        if (file.Length == 0 || file.Length > 5 * 1024 * 1024)
            return Result<bool>.Failure("BadFileSize");

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (extension is not ".jpg" and not ".jpeg" and not ".png")
            return Result<bool>.Failure("BadFileFormat");

        Directory.CreateDirectory(ProfilePicturesPath);

        DeleteProfilePicture(userId);

        var filePath = Path.Combine(
            ProfilePicturesPath,
            $"{userId}{extension}"
        );

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return Result<bool>.Success(true);
    }

    public Result<bool> DeleteProfilePicture(int userId)
    {
        foreach (var extension in new[] { ".jpg", ".jpeg", ".png" })
        {
            var path = Path.Combine(
                ProfilePicturesPath,
                $"{userId}{extension}"
            );

            if (File.Exists(path))
                File.Delete(path);
        }

        return Result<bool>.Success(true);
    }

    public async Task<Result<(Stream Stream, string ContentType)>> GetProfilePicture(int userId)
    {
        var user = await db.Users.FindAsync(userId);

        if (user is null)
            return Result<(Stream, string)>.Failure("UserNotFound");

        foreach (var extension in new[] { ".jpg", ".jpeg", ".png" })
        {
            var path = Path.Combine(
                ProfilePicturesPath,
                $"{userId}{extension}"
            );

            if (!File.Exists(path))
                continue;

            var contentType = extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                _ => "application/octet-stream"
            };

            var stream = new FileStream(
                path,
                FileMode.Open,
                FileAccess.Read,
                FileShare.Read
            );

            return Result<(Stream, string)>.Success((stream, contentType));
        }

        return Result<(Stream, string)>.Failure("ProfilePictureNotFound");
    }
}
