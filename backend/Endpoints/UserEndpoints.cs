using System.Security.Claims;

public static class UserEndpoints
{
    public static IEndpointRouteBuilder MapUserEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/user").RequireAuthorization();

        group.MapPut("/profile", async (ClaimsPrincipal p, UpdateProfileDto dto, UserService userService) =>
        {
            var id = int.Parse(p.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await userService.UpdateProfile(id, dto);
            return result.Ok
                ? Results.Ok(result.Value)
                : Results.BadRequest(result.Error);
        });

        group.MapPut("/password", async (ClaimsPrincipal p, NewPasswordDto dto, UserService userService) =>
        {
            var id = int.Parse(p.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await userService.ChangePassword(id, dto);
            return result.Ok
                ? Results.Ok()
                : Results.BadRequest(result.Error);
        });

        group.MapPut("/profile-picture", async (
            ClaimsPrincipal p,
            IFormFile file,
            FileStorageService fileStorageService) =>
        {
            var id = int.Parse(p.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await fileStorageService.UploadProfilePicture(id, file);
            return result.Ok
                ? Results.Ok()
                : Results.BadRequest(result.Error);
        }).DisableAntiforgery();

        group.MapDelete("/profile-picture", async (
            ClaimsPrincipal p,
            FileStorageService fileStorageService) =>
        {
            var id = int.Parse(p.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = fileStorageService.DeleteProfilePicture(id);
            return result.Ok
                ? Results.Ok()
                : Results.BadRequest(result.Error);
        });

        group.MapGet("/profile-picture", async (
            ClaimsPrincipal p,
            FileStorageService fileStorageService) =>
        {
            var id = int.Parse(p.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await fileStorageService.GetProfilePicture(id);
            return result.Ok
                ? Results.File(
                    result.Value.Stream,
                    result.Value.ContentType
                )
                : Results.NotFound();
        });

        return app;
    }
}
