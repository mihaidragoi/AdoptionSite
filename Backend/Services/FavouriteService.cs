using Microsoft.EntityFrameworkCore;

public class FavouriteService(Db db){
    public async Task<List<FavouriteDto>> GetFavourites(int userId)
    {
        return await db.Favourites
            .Where(f => f.UserId == userId)
            .OrderByDescending(f => f.AddedAt)
            .Select(f => new FavouriteDto(
                f.PetId,
                f.Pet.Name,
                f.Pet.BirthDate,
                f.Pet.Description,
                f.Pet.Media
                    .Where(m => m.IsCover)
                    .Select(m => m.Url)
                    .FirstOrDefault()
            ))
            .ToListAsync();
    }
}