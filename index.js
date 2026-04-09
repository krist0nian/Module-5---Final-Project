const inputElement = document.querySelector("#searchInput");
const formElement = document.querySelector("form");
const resultsElement = document.querySelector(".searchResults");

formElement.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    resultsElement.innerHTML = "";
    const inputValue = inputElement.value;
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e18454d7&s=${inputValue}`,);

    const data = await response.json();
    if (data.Response === "False") {
        return;
    }
    const movies = data.Search;
    movies.forEach(movie => {
        resultsElement.innerHTML += `
        <div class="movie__container">    
            <div class="movie__card">
            <img src="${movie.Poster}" onerror="this.src='./assets/noimageavailable.png';" alt="Movie Poster" class="movie__poster">
            <h4>${movie.Title}</h4>
            <p>${movie.Year}</p>
            </div>
        </div>
        `;
    });
});

async function renderMovies(filter) {

    if (filter === 'A_TO_Z') {
        movies.sort((a, b) => (a.movie.Title || a.movie.Title) - (b.movie.Title || b.movie.Title));
    }
    else if (filter === 'Z_TO_A') {
        movies.sort((a, b) => (b.movie.Title || b.movie.Title) - (a.movie.Title || a.movie.Title));
    }
    else if (filter === 'NEWEST_TO_OLDEST') {
        movies.sort((a, b) => b.movie.Year - a.movie.Year);
    }
    else if (filter === 'OLDEST_TO_NEWEST') {
        movies.sort((a, b) => a.movie.Year - b.movie.Year);
    }
    const moviesHtml = movies.map((movie) => { 
            return `<div class="movie__container">    
                <div class="movie__card">
                <img src="${movie.Poster}" alt="Movie Poster" class="movie__poster">
                <h4>${movie.Title}</h4>
                <p>${movie.Year}</p>
                </div>
            </div>
            `;
        }).join("");
        
    resultsElement.innerHTML = moviesHtml;
}

function filterMovies(event) {
    renderMovies(event.target.value);
}

setTimeout(() => {
   renderMovies();
});

