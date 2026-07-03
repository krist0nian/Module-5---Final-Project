const API_KEY = "e18454d7";
const API_URL = "https://www.omdbapi.com/";

async function fetchMovieById(imdbID) {
  if (!imdbID) throw new Error("No imdbID provided");

  const url = `${API_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=short`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Network error: ${response.status}`);

  const data = await response.json();
  if (data.Response === "False") throw new Error(data.Error || "Movie not found");

  return data;
}

function getImdbIDFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("imdbID");
}

const imdbID = getImdbIDFromURL();

const movieInfoElement = document.querySelector(".movieInfo");

if (imdbID) {
  fetchMovieById(imdbID)
    .then((movie) => {
      movieInfoElement.innerHTML = `
        <div class="movie__container">
          <div class="movie__card">
            <img src="${movie.Poster}" onerror="this.src='./assets/noimageavailable.png';" alt="Movie Poster" class="movie__poster">
            <div class="movie__details">
              <h2>${movie.Title}</h2>
              <p><strong>Year:</strong> ${movie.Year}</p>
              <p><strong>Genre:</strong> ${movie.Genre}</p>
              <p><strong>Director:</strong> ${movie.Director}</p>
              <p><strong>Actors:</strong> ${movie.Actors}</p>
              <p><strong>Plot:</strong> ${movie.Plot}</p>
              <p><strong>Rating:</strong> ${movie.Ratings[0]?.Value || "N/A"}</p>
            </div>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
      movieInfoElement.innerHTML = "<p>Sorry, we couldn't fetch the movie details. Please try again later.</p>";
    });
} else {
  movieInfoElement.innerHTML = "<p>No movie selected. Please go back and select a movie.</p>";
}
