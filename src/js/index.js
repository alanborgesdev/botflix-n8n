const moodTextArea = document.getElementById("mood-textarea");
const searchButton = document.getElementById("search-button");

document.addEventListener("DOMContentLoaded", () => {
	setupEventListeners();
});

function setupEventListeners() {
	moodTextArea.addEventListener("keypress", event => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSearch();
		}
	});

	searchButton.addEventListener("click", handleSearch);
}

async function handleSearch() {
	const mood = moodTextArea.value.trim();

	if (!mood) {
		alert("Preencha o campo de humor!");
		return;
	}

	const response = await fetch("https://borgesplay.app.n8n.cloud/webhook/botflix", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userPrompt: mood }),
	});

	const data = await response.json();

	if (data && data.results.length > 0) {
		const movie = data.results[0];
		const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

		const resultsDiv = document.getElementById("results");
		const moviesGrid = document.getElementById("movies-grid");

		resultsDiv.classList.add("show");

		moviesGrid.innerHTML = `<div class="movie-card">
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${movie.title}" />
                </div>
                <div class="movie-info">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-overview">${movie.overview || "Sem descrição."}</div>
                    <div class="movie-rating">⭐ ${movie.vote_average.toFixed() || "N/A"} / 10</div>
                </div>
            </div>`;
	}
}
