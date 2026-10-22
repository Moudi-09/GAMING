const gamesGrid = document.querySelector("#games-grid");
const yearNav = document.querySelector("#year-nav");
const yearFilter = document.querySelector("#year-filter");
const gameSearch = document.querySelector("#game-search");
const resultCount = document.querySelector("#result-count");
const loadState = document.querySelector("#load-state");

let activeRequest;
let searchTimer;

function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    if (text) {
        element.textContent = text;
    }
    return element;
}

function createGameCard(game) {
    const card = createElement("article", "game-card");
    const tag = createElement("span", "game-tag", game.genre);
    const image = createElement("img");
    image.src = game.imageUrl;
    image.alt = game.title;
    image.loading = "lazy";

    const info = createElement("div", "game-info");
    const year = createElement("p", "release-year", `Sortie PC · ${game.year}`);
    const title = createElement("h2", "", game.title);
    const description = createElement("p", "", game.description);
    const storeLink = createElement("a", "download-link", "Voir sur Steam");
    storeLink.href = game.storeUrl;
    storeLink.target = "_blank";
    storeLink.rel = "noopener noreferrer";

    info.append(year, title, description, storeLink);
    card.append(tag, image, info);
    return card;
}

function renderYearButtons(years) {
    yearNav.replaceChildren();
    yearFilter.replaceChildren(new Option("Toutes les années", ""));

    for (const year of years) {
        const button = createElement("button", "year-nav-item");
        const label = createElement("span", "year-nav-label", "Sorties PC");
        const yearText = createElement("strong", "", String(year));
        const action = createElement("span", "year-nav-action", "Filtrer les jeux");
        button.type = "button";
        button.dataset.year = String(year);
        button.setAttribute("aria-pressed", "false");
        button.append(label, yearText, action);
        yearNav.append(button);
        yearFilter.add(new Option(String(year), String(year)));
    }
}

function updateYearButtons() {
    for (const button of yearNav.querySelectorAll("[data-year]")) {
        button.setAttribute("aria-pressed", String(button.dataset.year === yearFilter.value));
    }
}

async function loadGames() {
    activeRequest?.abort();
    activeRequest = new AbortController();
    const { signal } = activeRequest;
    const params = new URLSearchParams();

    if (yearFilter.value) {
        params.set("year", yearFilter.value);
    }
    if (gameSearch.value.trim()) {
        params.set("search", gameSearch.value.trim());
    }

    loadState.hidden = false;
    loadState.textContent = "Chargement des jeux...";
    resultCount.textContent = "Mise à jour de la sélection...";

    try {
        const response = await fetch(`/api/games?${params}`, { signal });
        if (!response.ok) {
            throw new Error("La récupération du catalogue a échoué.");
        }

        const games = await response.json();
        gamesGrid.replaceChildren(...games.map(createGameCard));
        resultCount.textContent = `${games.length} jeu${games.length > 1 ? "x" : ""} trouvé${games.length > 1 ? "s" : ""}`;
        loadState.hidden = games.length > 0;
        loadState.textContent = "Aucun jeu ne correspond à cette recherche.";
        updateYearButtons();
    } catch (error) {
        if (error.name === "AbortError") {
            return;
        }

        gamesGrid.replaceChildren();
        resultCount.textContent = "Catalogue indisponible";
        loadState.hidden = false;
        loadState.textContent = "Impossible de charger les jeux. Vérifie que GameVault est lancé, puis actualise la page.";
    }
}

async function initializeCatalog() {
    try {
        const response = await fetch("/api/games/years");
        if (!response.ok) {
            throw new Error("La liste des années est indisponible.");
        }

        renderYearButtons(await response.json());
        const requestedYear = new URLSearchParams(window.location.search).get("year");
        if (Array.from(yearFilter.options).some(option => option.value === requestedYear)) {
            yearFilter.value = requestedYear;
        }
        await loadGames();
    } catch {
        resultCount.textContent = "Catalogue indisponible";
        loadState.hidden = false;
        loadState.textContent = "Impossible de charger le catalogue. Vérifie que GameVault est lancé, puis actualise la page.";
    }
}

yearNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-year]");
    if (button) {
        yearFilter.value = button.dataset.year;
        loadGames();
    }
});

yearFilter.addEventListener("change", loadGames);
gameSearch.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(loadGames, 250);
});

initializeCatalog();