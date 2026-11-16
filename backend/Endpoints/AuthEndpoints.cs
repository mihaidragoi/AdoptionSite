using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

public static class AuthEndpoints
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth");

        group.MapPost("/register", async (RegisterDto dto, AuthService auth) =>
        {
            var result = await auth.RegisterUser(dto);
            return result.Ok
                           ? Results.Created($"/api/auth/{result.Value!.Id}", result.Value)
                           : Results.BadRequest(result.Error);
        });

        group.MapPost("/login", async (LoginDto dto, AuthService auth, HttpContext ctx) =>
            {
                var result = await auth.LoginUser(dto);
                if (!result.Ok)
                {
                    return Results.BadRequest(result.Error);
                }

                var user = result.Value!;
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                };

                await ctx.SignInAsync("Cookies", new ClaimsPrincipal(new ClaimsIdentity(claims, "Cookies")));
                return Results.Ok(user);
            });

        group.MapGet("/me", async (ClaimsPrincipal p, Db db) =>
        {
            var id = int.Parse(p.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var u = await db.Users.FindAsync(id);
            return u is null
                ? Results.Unauthorized()
                : Results.Ok(new UserDto(u.Id, u.Email, u.PhoneNumber, u.FirstName, u.LastName));
        }).RequireAuthorization();

        group.MapPost("/logout", async (HttpContext ctx) =>
        {
            await ctx.SignOutAsync("Cookies");
            return Results.Ok();
        });

        return app;
    }
}
