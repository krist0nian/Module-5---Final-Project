const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e18454d7";

async function fetchMovieById(imdbID) {
    const response = await fetch(`${API_URL}&i=${imdbID}`);
    const data = await response.json();
    return data;
}

function getImdbIDFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("imdbID");
}

const imdbID = getImdbIDFromURL();

fetchMovieById(imdbID).then(movie => {
    const movieInfoElement = document.querySelector(".movieInfo");
    movieInfoElement.innerHTML = `
    <div class="movie__container">
        <div class="movie__card">
            <img src="${movie.Poster}" onerror="this.src='./assets/noimageavailable.png';" alt="Movie Poster" class="movie__poster">
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
        </div>
    </div>
    `;
}).catch(error => {
    console.error("Error fetching movie data:", error);
    const movieInfoElement = document.querySelector(".movieInfo");
    movieInfoElement.innerHTML = "<p>Sorry, we couldn't fetch the movie details. Please try again later.</p>";
});

