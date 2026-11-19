using Microsoft.EntityFrameworkCore;

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
}