public record FavouriteDto(
    int Id,
    string Name,
    DateOnly? BirthDate,
    string Description,
    string? ImageUrl
);