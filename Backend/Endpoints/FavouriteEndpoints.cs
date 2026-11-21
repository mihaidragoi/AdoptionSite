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

        group.MapGet("/ids", async (ClaimsPrincipal p, FavouriteService favouriteService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var result = await favouriteService.GetFavouritesIds(userId);
            return result.Ok
                ? Results.Ok(result.Value)
                : Results.BadRequest(result.Error);

        }).RequireAuthorization();


        group.MapPost("/{petId:int}", async (ClaimsPrincipal p, int petId, FavouriteService favouriteService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var result = await favouriteService.AddToFavourites(userId, petId);
            return result.Ok
                ? Results.Ok()
                : Results.BadRequest(result.Error);

        }).RequireAuthorization();

        group.MapDelete("/{petId:int}", async (ClaimsPrincipal p, int petId, FavouriteService favouriteService) =>
        {
            var userIdString = p.FindFirstValue(ClaimTypes.NameIdentifier);
            if(string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out var userId))
                return Results.Unauthorized();
            
            var result = await favouriteService.RemoveFromFavourites(userId, petId);
            return result.Ok
                ? Results.Ok()
                : Results.BadRequest(result.Error);

        }).RequireAuthorization();

        return app;
    }

}