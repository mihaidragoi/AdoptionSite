public static class AdminPetsEndpoints
{
    public static IEndpointRouteBuilder MapAdminPetsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/admin/pets").RequireAuthorization(policy => policy.RequireRole("Admin"));

        group.MapGet("/", async (AdminPetService adminPetService) =>
        {
            var result = await adminPetService.GetAllPets();
            return result.Ok
                ? Results.Ok(result.Value)
                : Results.BadRequest(result.Error);
        });

        return app;
    }
}