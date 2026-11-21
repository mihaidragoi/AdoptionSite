public record class PetDto(
    int Id,
    string Name,
    DateOnly? BirthDate,
    string Description,
    string? ImageUrl
);