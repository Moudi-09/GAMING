using GameVault.Api;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGet("/api/games", (int? year, string? search) =>
{
    IEnumerable<Game> games = GameCatalog.Games;

    if (year.HasValue)
    {
        games = games.Where(game => game.Year == year.Value);
    }

    if (!string.IsNullOrWhiteSpace(search))
    {
        var query = search.Trim();
        games = games.Where(game =>
            game.Title.Contains(query, StringComparison.OrdinalIgnoreCase) ||
            game.Genre.Contains(query, StringComparison.OrdinalIgnoreCase) ||
            game.Description.Contains(query, StringComparison.OrdinalIgnoreCase));
    }

    return Results.Ok(games.OrderByDescending(game => game.Year).ThenBy(game => game.Title));
});

app.MapGet("/api/games/years", () => Results.Ok(GameCatalog.Games
    .Select(game => game.Year)
    .Distinct()
    .OrderByDescending(year => year)));

app.Run();