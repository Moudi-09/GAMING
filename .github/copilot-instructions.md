# Instructions pour les agents IA sur GameVault

## Architecture
- Application de catalogue de jeux PC avec frontend HTML/CSS/JavaScript et API REST ASP.NET Core en C#.
- `GameVault.Api/Program.cs` configure les routes API et les fichiers statiques de `GameVault.Api/wwwroot/`.
- `GameVault.Api/Data/GameCatalog.cs` contient les données initiales ; `GameVault.Api/Models/Game.cs` définit le modèle.
- `GameVault.Api/wwwroot/index.html` est l'accueil ; `catalogue.html` consomme l'API ; `js/app.js` gère recherche, filtres et rendu ; `css/style.css` contient les styles.
- Les images sont rangées dans `GameVault.Api/wwwroot/images/`.

## Conventions
- Garder l'interface en français, responsive et accessible.
- Garder les liens de boutique vers des pages officielles.
- Ajouter les données de jeu dans `Data/GameCatalog.cs` et les images dans `wwwroot/images/`.
- Ne pas placer de clés secrètes ou de jetons dans le JavaScript client.
- Réutiliser les API .NET intégrées ; éviter les dépendances externes sans besoin justifié.

## Vérification et exécution
- SDK .NET 10 requis.
- Compiler avec `dotnet build GameVault.Api/GameVault.Api.csproj`.
- Lancer depuis la racine avec `dotnet run --project GameVault.Api --urls http://localhost:5080`.
- Vérifier les routes `GET /api/games`, `GET /api/games/years` et les interactions de `catalogue.html`.
- Les pages doivent être servies par ASP.NET Core ; ouvrir les fichiers en `file://` ne fournit pas l'API.
