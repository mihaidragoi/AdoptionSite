using System.Security.Claims;
public static class CartEndpoints{
    public static IEndpointRouteBuilder MapCartEndpoints(this IEndpointRouteBuilder app){
        var group = app.MapGroup("/api/cart");

        group.MapGet("/", async (ClaimsPrincipal p, CartService cartService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var items = await cartService.GetCart(userId);
            return Results.Ok(items);

        }).RequireAuthorization();

        return app;
    }

}