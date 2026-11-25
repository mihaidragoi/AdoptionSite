using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication("Cookies")
    .AddCookie("Cookies", o =>
    {
        o.Cookie.Name = "auth";
        o.Cookie.HttpOnly = true;
        o.Cookie.SameSite = SameSiteMode.Strict;
        o.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
                    ? CookieSecurePolicy.SameAsRequest
                    : CookieSecurePolicy.Always;

        o.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };

        o.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };

        o.Events.OnValidatePrincipal = async context =>
        {
            var userIdClaim = context.Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var roleClaim = context.Principal?.FindFirst(ClaimTypes.Role)?.Value;

            if (!int.TryParse(userIdClaim, out var userId))
            {
                context.RejectPrincipal();
                await context.HttpContext.SignOutAsync("Cookies");
                return;
            }

            var db = context.HttpContext.RequestServices.GetRequiredService<Db>();
            var currentRole = await db.Users
                .Where(u => u.Id == userId)
                .Select(u => u.Role)
                .FirstOrDefaultAsync();

            if (currentRole.ToString() != roleClaim)
            {
                context.RejectPrincipal();
                await context.HttpContext.SignOutAsync("Cookies");
            }
        };
    });

builder.Services.AddAntiforgery();
builder.Services.AddAuthorization();

builder.Services.AddDbContext<Db>(o =>
    o.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<FileStorageService>();
builder.Services.AddScoped<CartService>();
builder.Services.AddScoped<FavouriteService>();
builder.Services.AddScoped<PetService>();
builder.Services.AddScoped<AdminPetService>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseAntiforgery();

app.MapAuthEndpoints();
app.MapUserEndpoints();
app.MapCartEndpoints();
app.MapFavouriteEndpoints();
app.MapPetEndpoints();
app.MapAdminPetsEndpoints();

app.Run();
