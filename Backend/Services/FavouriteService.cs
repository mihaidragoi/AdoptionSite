using Microsoft.EntityFrameworkCore;
using Npgsql;
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

    public async Task<Result<List<int>>> GetFavouritesIds(int userId)
    {
        var favourites = await db.Favourites
            .Where(f => f.UserId == userId)
            .Select(f => f.PetId)
            .ToListAsync();

        return Result<List<int>>.Success(favourites);
    }

    public async Task<Result<bool>> AddToFavourites(int userId, int petId)
    {
        var pet = await db.Pets.FindAsync(petId);
        if (pet is null)
            return Result<bool>.Failure("PetNotFound");
        if (pet.IsAdopted)
            return Result<bool>.Failure("PetAlreadyAdopted");

        var favourite = new Favourite
        {
            UserId = userId,
            PetId = petId,
        };

        await db.Favourites.AddAsync(favourite);

        try
        {
            await db.SaveChangesAsync();
        }
        catch(DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation })
        {
            return Result<bool>.Failure("AlreadyInFavourites");
        }

        return Result<bool>.Success(true);
    }

    public async Task<Result<bool>> RemoveFromFavourites(int userId, int petId)
    {
        var favourite = await db.Favourites
            .FirstOrDefaultAsync(f => f.UserId == userId && f.PetId == petId);

        if (favourite is null)
            return Result<bool>.Failure("NotInFavourites");

        db.Favourites.Remove(favourite);
        await db.SaveChangesAsync();
        return Result<bool>.Success(true);
    }
}