public static class PetEndpoints{
    private const int RecentPetsLimit = 6;

    public static IEndpointRouteBuilder MapPetEndpoints(this IEndpointRouteBuilder app){
        var group = app.MapGroup("/api/pets");

        group.MapGet("/", async (PetService petService) =>
        {
            var items = await petService.GetPets(RecentPetsLimit);
            return Results.Ok(items);
        });

        return app;
    }

}