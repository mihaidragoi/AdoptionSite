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

        group.MapGet("/ids", async (ClaimsPrincipal p, CartService cartService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var result = await cartService.GetCartIds(userId);
            return result.Ok
                ? Results.Ok(result.Value)
                : Results.BadRequest(result.Error);

        }).RequireAuthorization();

        group.MapPost("/{petId:int}", async (ClaimsPrincipal p, int petId, CartService cartService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var result = await cartService.AddToCart(userId, petId);
            return result.Ok
                ? Results.Ok()
                : Results.BadRequest(result.Error);

        }).RequireAuthorization();

        group.MapDelete("/{petId:int}", async (ClaimsPrincipal p, int petId, CartService cartService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var result = await cartService.RemoveFromCart(userId, petId);
            return result.Ok
                ? Results.Ok()
                : Results.BadRequest(result.Error);

        }).RequireAuthorization();

        return app;
    }

}