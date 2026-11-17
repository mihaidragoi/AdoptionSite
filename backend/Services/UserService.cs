using Microsoft.EntityFrameworkCore;

using System.Net.Mail;
using System.Text.RegularExpressions;

using Npgsql;

public class UserService(Db db)
{
    public async Task<Result<UserDto>> UpdateProfile(int userId, UpdateProfileDto dto)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return Result<UserDto>.Failure("UserNotFound");

        var email = dto.Email.Trim().ToLowerInvariant();

        if (!MailAddress.TryCreate(email, out _) || email.Length > 254)
            return Result<UserDto>.Failure("BadEmail");

        if (!Regex.IsMatch(dto.PhoneNumber, @"^\+[1-9]\d{7,14}$"))
            return Result<UserDto>.Failure("BadPhone");

        if (string.IsNullOrWhiteSpace(dto.FirstName) || string.IsNullOrWhiteSpace(dto.LastName))
            return Result<UserDto>.Failure("BadName");

        if (await db.Users.AnyAsync(u => u.Email == email && u.Id != userId))
            return Result<UserDto>.Failure("EmailTaken");

        if (await db.Users.AnyAsync(u => u.PhoneNumber == dto.PhoneNumber && u.Id != userId))
            return Result<UserDto>.Failure("PhoneTaken");

        user.Email = email;
        user.PhoneNumber = dto.PhoneNumber;
        user.FirstName = dto.FirstName.Trim();
        user.LastName = dto.LastName.Trim();

        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation } pg)
        {
            return Result<UserDto>.Failure(
                pg.ConstraintName?.Contains("Email", StringComparison.OrdinalIgnoreCase) == true
                    ? "EmailTaken"
                    : "PhoneTaken");
        }

        return Result<UserDto>.Success(new UserDto(
            user.Id,
            user.Email,
            user.PhoneNumber,
            user.FirstName,
            user.LastName
        ));
    }

    public async Task<Result<bool>> ChangePassword(int userId, NewPasswordDto dto)
    {
        var user = await db.Users.FindAsync(userId);
        if (user is null)
            return Result<bool>.Failure("UserNotFound");

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            return Result<bool>.Failure("WrongPassword");

        if (dto.NewPassword.Length < 8 || dto.NewPassword.Length > 100)
            return Result<bool>.Failure("BadPassword");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

        await db.SaveChangesAsync();
        return Result<bool>.Success(true);
    }
}
