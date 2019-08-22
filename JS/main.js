const URL = 'https://www.omdbapi.com/';
const MOVIE_DB_API = '338f9a63';

const getMovies = (e) => {
    e.preventDefault();
    let searchInput = document.querySelector('#searchTxt').value;
    fetch(`${URL}?s=${searchInput}&apikey=${MOVIE_DB_API}`)
        .then(res => res.json())
        .then(({ Search }) => renderMovies(Search))
        .catch(err => console.log(err))
    console.log(getMovies);
}

if (document.querySelector('#searchForm')) {
    document.querySelector('#search').addEventListener('click', getMovies);
    document.querySelector('#searchForm').addEventListener('submit', getMovies);
}

const renderMovies = (movies) => {
    let output = '<div class="flex-grid-container">';
    for (let i = 0; i < movies.length; i++) {
        let Poster = movies[i].Poster;
        let Title = movies[i].Title;
        let ID = movies[i].imdbID;
        
        output += `
                    <figure>
                    <img class="scaled" onClick="moviesSelected('${ID}')" href="#" src="${Poster}" alt="Image of the Movie"/>
                    <figCaption>${Title}</figCaption>
                    </figure>
                
                `;
    }
    output += '</div>';
    document.querySelector('#movies').innerHTML = output;
    console.log(movies);
}

const moviesSelected = (ID) => {
    sessionStorage.setItem('movieId', ID);
    window.location = 'movie.html';
    return false;
}

const getMovie = () =>  {
    let movieId = sessionStorage.getItem('movieId');


    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=338f9a63`)
        .then(res => res.json())
        .then(movie => renderMovie(movie))
        .catch();

}

const renderMovie = (movie) => {

    let output = `
            <div class="movies-container">
                <div id="movie">
                    <img class="scaled" src="${movie.Poster}">
                </div>
                <div class="movieDetails">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                    </ul>
                </div>
            </div>

            <div class="extraInfo">
                <h3>Plot</h3>${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID} "target="_blank " class="imdb">View IMDB</a> 
                <a href = "index.html" class = "goHome"> Go Back to Search </a> 
                
            </div>`;

    document.querySelector('#movie').innerHTML = output;
}
