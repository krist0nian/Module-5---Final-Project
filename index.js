function openMenu() {
    document.body.classList += "menu--open"
}

function closeMenu () {
    document.body.classList.remove('menu--open')
}

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
    const movies = Array.from(resultsElement.querySelectorAll(".movie__card")).map(card => {
        return {
            Title: card.querySelector("h4").textContent,
            Year: parseInt(card.querySelector("p").textContent),
            imdbID: card.getAttribute("onclick").match(/'([^']+)'/)[1],
            Poster: card.querySelector("img").src
        };
    });
    
    if (filter === 'A_TO_Z') {
        movies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === 'Z_TO_A') {
        movies.sort((a, b) => b.Title.localeCompare(a.Title));
    }   else if (filter === 'YEAR_ASC') {
        movies.sort((a, b) => b.Year - a.Year);
    }
        else if (filter === 'YEAR_DESC') {
        movies.sort((a, b) => a.Year - b.Year);
    }

    resultsElement.innerHTML = movies.map(movie => movieHTML(movie)).join("");
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
