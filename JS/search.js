const URL = 'https://www.omdbapi.com/';
const MOVIE_DB_API = '338f9a63';


getMovies = (e) => {
    e.preventDefault();
    let searchInput = document.querySelector('#searchTxt').value;
    fetch(`${URL}?s=${searchInput}&apikey=${MOVIE_DB_API}`)
        .then(res => res.json())
        .then(({ Search }) => renderMovies(Search))
        .catch(err => console.log(err))
}

if (document.querySelector('#searchForm')) {
    document.querySelector('#search').addEventListener('click', getMovies);
    document.querySelector('#searchForm').addEventListener('submit', getMovies);
}

renderMovies = (movies) => {
    let output = '<div class="flex-grid-container">';
    for (let i = 0; i < movies.length; i++) {
        let Poster = movies[i].Poster;
        let Title = movies[i].Title;
        let ID = movies[i].imdbID;
        
        output += `
                    <div class="movie-poster">
                        <img class="scaled" onClick="moviesSelected('${ID}')" href="#" src="${Poster}" alt="No Poster Available"/>   
                        <header onClick="moviesSelected('${ID}')" src="${Poster}">
                        <h2>${Title}</h2>
                        <header>
                    </div>   
                
                `;
    }
    output += '</div>';
    document.querySelector('#movies').innerHTML = output;
}


moviesSelected = (ID) => {
    sessionStorage.setItem('movieId', ID);
    window.location = 'movie.html';
    return false;
}

getMovie = () =>  {
    let movieId = sessionStorage.getItem('movieId');
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=338f9a63`)
        .then(res => res.json())
        .then(movie => renderMovie(movie))
        .catch(err => console.log(err));
}

renderMovie = (movie) => {
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
                    <a  href="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">
                        <button class="ripple" id="video">Play</button>
                    </a>
                </ul>
            </div>
        </div>  

        <div class="extraInfo">
            <h3>Plot</h3><span>${movie.Plot}</span>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID} "target="_blank " id="video">View IMDB</a> 
            <a href="index.html" id="video"> Go Back to Search </a> 
        </div>

        `;

    document.querySelector('#movie').innerHTML = output;
}
