const inputElement = document.querySelector("#searchInput");
const formElement = document.querySelector("form");
const resultsElement = document.querySelector(".searchResults");

formElement.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    resultsElement.innerHTML = "";
    const inputValue = inputElement.value;
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=e18454d7&s=${inputValue}`,);

    const data = await response.json();
    if (data.Response === "False") {
        return;
    }
    const movies = data.Search;
    movies.forEach(movie => {
        resultsElement.innerHTML += `
        <div class="movie__container">    
            <div class="movie__card" onclick="showMovieInfo('${movie.imdbID}')">
            <img src="${movie.Poster}" onerror="this.src='./assets/noimageavailable.png';" alt="Movie Poster" class="movie__poster">
            <h4>${movie.Title}</h4>
            <p>${movie.Year}</p>
            </div>
        </div>
        `;
    });
});

function renderMovies(filter) {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(filter.toLowerCase()));
    resultsElement.innerHTML = "";

    filteredMovies.forEach(movie => {
        resultsElement.innerHTML += movieHTML(movie);
    });
    if (filter === 'A_TO_Z') {
        filteredMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === 'Z_TO_A') {
        filteredMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    }   else if (filter === 'YEAR_ASC') {
        filteredMovies.sort((a, b) => a.Year - b.Year);
    }
        else if (filter === 'YEAR_DESC') {
        filteredMovies.sort((a, b) => b.Year - a.Year);
    }
}

function movieHTML(movie) {
    return `
    <div class="movie__container">    
        <div class="movie__card" onclick="showMovieInfo('${movie.imdbID}')">
        <img src="${movie.Poster}" onerror="this.src='./assets/noimageavailable.png';" alt="Movie Poster" class="movie__poster">
        <h4>${movie.Title}</h4>
        <p>${movie.Year}</p>
        </div>
    </div>
    `;
}

function showMovieInfo(imdbID) {
    window.location.href = `movie.html?imdbID=${imdbID}`;
}   

function filterMovies(event) {
    renderMovies(event.target.value);
}