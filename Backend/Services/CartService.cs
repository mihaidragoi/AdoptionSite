using Microsoft.EntityFrameworkCore;
using Npgsql;
public class CartService(Db db){
    public async Task<List<CartItemDto>> GetCart(int userId)
    {
        return await db.CartItems
            .Where(c => c.UserId == userId)
            .OrderByDescending(c => c.AddedAt)
            .Select(c => new CartItemDto(
                c.PetId,
                c.Pet.Name,
                c.Pet.BirthDate,
                c.Pet.Description,
                c.Pet.Media
                    .Where(m => m.IsCover)
                    .Select(m => m.Url)
                    .FirstOrDefault()
            ))
            .ToListAsync();
    }

    public async Task<Result<List<int>>> GetCartIds(int userId)
    {
        var cartItems = await db.CartItems
            .Where(c => c.UserId == userId)
            .Select(c => c.PetId)
            .ToListAsync();

        return Result<List<int>>.Success(cartItems);
    }

    public async Task<Result<bool>> AddToCart(int userId, int petId)
    {
        var pet = await db.Pets.FindAsync(petId);
        if (pet is null)
            return Result<bool>.Failure("PetNotFound");
        if (pet.IsAdopted)
            return Result<bool>.Failure("PetAlreadyAdopted");

        var cartItem = new CartItem
        {
            UserId = userId,
            PetId = petId,
        };

        await db.CartItems.AddAsync(cartItem);

        try
        {
            await db.SaveChangesAsync();
        }
        catch(DbUpdateException ex) when (ex.InnerException is PostgresException { SqlState: PostgresErrorCodes.UniqueViolation })
        {
            return Result<bool>.Failure("AlreadyInCart");
        }

        return Result<bool>.Success(true);
    }

    public async Task<Result<bool>> RemoveFromCart(int userId, int petId)
    {
        var cartItem = await db.CartItems
            .FirstOrDefaultAsync(c => c.UserId == userId && c.PetId == petId);

        if (cartItem is null)
            return Result<bool>.Failure("NotInCart");

        db.CartItems.Remove(cartItem);
        await db.SaveChangesAsync();

        return Result<bool>.Success(true);
    }
}