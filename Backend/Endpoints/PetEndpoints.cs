public static class PetEndpoints{
    private const int RecentPetsLimit = 6;

    public static IEndpointRouteBuilder MapPetEndpoints(this IEndpointRouteBuilder app){
        var group = app.MapGroup("/api/pets");

        group.MapGet("/", async (PetService petService) =>
        {
            var items = await petService.GetPets(RecentPetsLimit);
            return Results.Ok(items);
        });

        group.MapGet("/all", async (PetService petService) =>
        {
            var items = await petService.GetAllPets();
            return Results.Ok(items);
        });

        group.MapGet("/{petId:int}", async (int petId, PetService petService) =>
        {
            var item = await petService.GetPetDetails(petId);
            return item is null
                ? Results.NotFound()
                : Results.Ok(item);
        });

        return app;
    }

}