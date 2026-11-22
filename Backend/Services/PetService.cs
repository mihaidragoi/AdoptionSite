using Microsoft.EntityFrameworkCore;
public class PetService(Db db){
    public async Task<List<PetDto>> GetPets(int limit)
    {
        return await db.Pets
            .Where(p => p.AdoptedDate == null)
            .OrderByDescending(p => p.ShelterDate)
            .Take(limit)
            .Select(p => new PetDto(
                p.Id,
                p.Name,
                p.BirthDate,
                p.Description,
                p.Media
                    .Where(m => m.IsCover)
                    .Select(m => m.Url)
                    .FirstOrDefault()
            ))
            .ToListAsync();
    }

    public async Task<List<PetDto>> GetAllPets()
    {
        return await db.Pets
            .Where(p => p.AdoptedDate == null)
            .OrderByDescending(p => p.ShelterDate)
            .Select(p => new PetDto(
                p.Id,
                p.Name,
                p.BirthDate,
                p.Description,
                p.Media
                    .Where(m => m.IsCover)
                    .Select(m => m.Url)
                    .FirstOrDefault()
            ))
            .ToListAsync();
    }

    public async Task<PetDetailsUser?> GetPetDetails(int petId)
    {
        var pet = await db.Pets
            .Include(p => p.Media)
            .FirstOrDefaultAsync(p => p.Id == petId);

        if (pet == null)
            return null;

        var mediaDtos = pet.Media
            .OrderBy(m => m.SortOrder)
            .Select(m => new PetMediaUser(
                m.Url,
                m.Type.ToString(),
                m.IsCover
            ))
            .ToList();

        return new PetDetailsUser(
            pet.Id,
            pet.Name,
            pet.Type.ToString(),
            pet.Breed,
            pet.Sex.ToString(),
            pet.Size.ToString(),
            pet.BirthDate,
            pet.ShelterDate,
            pet.Description,
            pet.IsNeutered.ToString(),
            pet.IsVaccinated.ToString(),
            mediaDtos
        );
    }
}