using Microsoft.EntityFrameworkCore;

using System.Net.Mail;
using System.Text.RegularExpressions;

using Npgsql;

public class AuthService(Db db)
{
    public async Task<Result<UserDto>> RegisterUser(RegisterDto dto)
    {
        var email = dto.Email.Trim().ToLowerInvariant();

        if (!MailAddress.TryCreate(email, out _) || email.Length > 254)
            return Result<UserDto>.Failure("BadEmail");

        if (!Regex.IsMatch(dto.PhoneNumber, @"^\+[1-9]\d{7,14}$"))
            return Result<UserDto>.Failure("BadPhone");

        if (dto.Password.Length < 8 || dto.Password.Length > 100)
            return Result<UserDto>.Failure("BadPassword");

        if (string.IsNullOrWhiteSpace(dto.FirstName) || string.IsNullOrWhiteSpace(dto.LastName))
            return Result<UserDto>.Failure("BadName");

        if (await db.Users.AnyAsync(u => u.Email == email))
            return Result<UserDto>.Failure("EmailTaken");

        if (await db.Users.AnyAsync(u => u.PhoneNumber == dto.PhoneNumber))
            return Result<UserDto>.Failure("PhoneTaken");

        var user = new User
        {
            Email = email,
            PhoneNumber = dto.PhoneNumber,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            FirstName = dto.FirstName.Trim(),
            LastName = dto.LastName.Trim()
        };

        try
        {
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation } pg)
        {
            return Result<UserDto>.Failure(
                pg.ConstraintName?.Contains("Email", StringComparison.OrdinalIgnoreCase) == true ? "EmailTaken" : "PhoneTaken");
        }

        return Result<UserDto>.Success(new UserDto(
            user.Id,
            user.Email,
            user.PhoneNumber,
            user.FirstName,
            user.LastName
        ));
    }

    public async Task<Result<UserDto>> LoginUser(LoginDto dto)
    {
        var email = dto.Email.Trim().ToLowerInvariant();

        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Result<UserDto>.Failure("InvalidCredentials");

        return Result<UserDto>.Success(new UserDto(
            user.Id,
            user.Email,
            user.PhoneNumber,
            user.FirstName,
            user.LastName
        ));
    }
}
