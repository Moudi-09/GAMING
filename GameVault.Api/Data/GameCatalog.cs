namespace GameVault.Api;

public static class GameCatalog
{
    public static IReadOnlyList<Game> Games { get; } =
    [
        new(
            "god-of-war",
            "God of War",
            2022,
            "Action • Aventure",
            "Accompagne Kratos et Atreus dans une aventure inspirée de la mythologie nordique.",
            "/images/god-of-war.jpg",
            "https://store.steampowered.com/app/1593500/God_of_War/"),
        new(
            "efootball",
            "eFootball",
            2021,
            "Football",
            "Un jeu de football free-to-play, régulièrement mis à jour avec de nouveaux contenus.",
            "/images/efootball.jpg",
            "https://store.steampowered.com/app/1665460/eFootball/"),
        new(
            "grand-theft-auto-v",
            "Grand Theft Auto V",
            2015,
            "Monde ouvert",
            "Explore Los Santos dans un jeu d’action en monde ouvert signé Rockstar Games.",
            "/images/grand-theft-auto-v.jpg",
            "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/")
    ];
}