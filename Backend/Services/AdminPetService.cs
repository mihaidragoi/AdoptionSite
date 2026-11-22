using Microsoft.EntityFrameworkCore;
public class AdminPetService(Db db)
{
    public async Task<Result<List<PetAdminDto>>> GetAllPets()
    {
        var pets = await db.Pets
            .Include(p => p.Media)
            .OrderByDescending(p => p.ShelterDate)
            .AsNoTracking()
            .ToListAsync();

        var petsDtos = pets.Select(p => new PetAdminDto(
            p.Id,
            p.Name,
            p.Type.ToString(),
            p.Breed,
            p.Sex.ToString(),
            p.Size.ToString(),
            p.BirthDate,
            p.ShelterDate,
            p.AdoptedDate,
            p.Description,
            p.IsNeutered.ToString(),
            p.IsVaccinated.ToString(),
            p.IsAdopted,
            p.Media
                .OrderBy(m => m.SortOrder)
                .Select(m => new PetMediaAdminDto(
                    m.Id,
                    m.Url,
                    m.Type.ToString(),
                    m.IsCover,
                    m.SortOrder))
                .ToList()
        )).ToList();

        return Result<List<PetAdminDto>>.Success(petsDtos);
    }
}