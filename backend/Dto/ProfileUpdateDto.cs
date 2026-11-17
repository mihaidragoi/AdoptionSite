public record UpdateProfileDto(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber
);

public record NewPasswordDto(
    string CurrentPassword,
    string NewPassword
);
