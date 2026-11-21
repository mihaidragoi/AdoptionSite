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
}