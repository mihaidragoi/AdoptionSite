public record CartItemDto(
    int Id,
    string Name,
    DateOnly? BirthDate,
    string Description,
    string? ImageUrl
);
