# GameVault

GameVault est un catalogue de jeux PC classés par année. L'interface utilise HTML, CSS et JavaScript ; une API REST ASP.NET Core en C# fournit les données du catalogue.

## Structure

- `GameVault.Api/Program.cs` : API REST et configuration de l'application.
- `GameVault.Api/Models/` : modèles C#.
- `GameVault.Api/Data/` : catalogue initial des jeux.
- `GameVault.Api/wwwroot/` : pages web, CSS, JavaScript et images servies par ASP.NET Core.

## Prérequis

- SDK .NET 10

## Lancer en local

Depuis la racine du projet :

```powershell
dotnet run --project GameVault.Api --urls http://localhost:5080
```

Ouvrir ensuite `http://localhost:5080` dans le navigateur. Il faut lancer l'application .NET : ouvrir les fichiers HTML directement ne permet pas d'utiliser l'API.

## API

- `GET /api/games` : tous les jeux, triés par année décroissante.
- `GET /api/games?year=2022` : jeux d'une année.
- `GET /api/games?search=war` : recherche par titre, genre ou description.
- `GET /api/games/years` : années présentes dans le catalogue.

Les données sont définies dans `GameVault.Api/Data/GameCatalog.cs`. Les images sont rangées dans `GameVault.Api/wwwroot/images/` et référencées depuis le catalogue C#.

Les liens de consultation et de téléchargement pointent vers les pages officielles des boutiques. Une clé d'API externe n'est pas nécessaire pour le catalogue actuel.

Le dépôt GitHub conserve le code source ; pour exécuter l'API en ligne, choisir un hébergeur compatible ASP.NET Core 10. GitHub Pages seul ne peut pas exécuter le backend C#.
