public record RegisterDto(
    string Email,
    string PhoneNumber,
    string Password,
    string FirstName,
    string LastName
);

public record UserDto(
    int Id,
    string Email,
    string PhoneNumber,
    string FirstName,
    string LastName,
    string Role
);

public record LoginDto(
    string Email,
    string Password
);
