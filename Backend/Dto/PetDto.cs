public record class PetDto(
    int Id,
    string Name,
    DateOnly? BirthDate,
    string Description,
    string? ImageUrl
);

public record PetMediaAdminDto(
    int Id,
    string Url,
    string Type,
    bool IsCover,
    int SortOrder
);

public record PetAdminDto(
    int Id,
    string Name,
    string Type,
    string? Breed,
    string Sex,
    string Size,
    DateOnly? BirthDate,
    DateOnly ShelterDate,
    DateOnly? AdoptedDate,
    string Description,
    string IsNeutered,
    string IsVaccinated,
    bool IsAdopted,
    List<PetMediaAdminDto> Media
);

public record PetMediaUser(
    string Url,
    string Type,
    bool IsCover
);

public record PetDetailsUser(
    int Id,
    string Name,
    string Type,
    string? Breed,
    string Sex,
    string Size,
    DateOnly? BirthDate,
    DateOnly ShelterDate,
    string Description,
    string IsNeutered,
    string IsVaccinated,
    List<PetMediaUser> Media
);