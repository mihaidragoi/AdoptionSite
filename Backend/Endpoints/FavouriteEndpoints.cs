using System.Security.Claims;

public static class FavouriteEndpoints{
    public static IEndpointRouteBuilder MapFavouriteEndpoints(this IEndpointRouteBuilder app){
        var group = app.MapGroup("/api/favourites");

        group.MapGet("/", async (ClaimsPrincipal p, FavouriteService favouriteService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var items = await favouriteService.GetFavourites(userId);
            return Results.Ok(items);

        }).RequireAuthorization();

        return app;
    }

}