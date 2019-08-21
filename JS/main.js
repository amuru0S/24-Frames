const URL = 'https://www.omdbapi.com/';
const MOVIE_DB_API = '338f9a63';

const getMovies = (e) => {
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

const renderMovies = (movies) => {
    let output = '';
    for (let i = 0; i < movies.length; i++) {
        let Poster = movies[i].Poster;
        let Title = movies[i].Title;
        let ID = movies[i].imdbID;

        output += `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="${Poster}">
                    <h5>${Title}</h5>
                    <a onClick="moviesSelected('${ID}')" class="btn btn-primary" href="#">Movies Details</a>
                    </div>
                </div>
                `;
    }
    document.querySelector('#movies').innerHTML = output;
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
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}">
                </div>

                <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
                </ul>

                </div>
            </div>

            <div class="row">
                <div class="well">
                    <h3>Plot</h3>${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID} "target="_blank " class="btn btn-primary mr-2 my-1">View IMDB</a> 
                    <a href = "index.html" class = "btn btn-primary my-1"> Go Back to Search </a> 
                </div> 
            </div>`;

    document.querySelector('#movie').innerHTML = output;
}













// const MOVIE_DB_API = '338f9a63';
// const URL = 'https://www.omdbapi.com';

// if (document.querySelector('#form-group')) {
//     document.querySelector('#search').addEventListener('onClick', getMovies);
// }

// function getMovies(e) {
//     e.preventDefault();
//     let searchInput = document.querySelector('#input-search').value;
//     console.log(searchInput);
//     fetch(`https://www.omdbapi.com?s=${searchInput}&apikey=338f9a63&type=movies`)
//         .then(res => res.json())
//         .then(({ Search }) => renderMovies(Search))
//         .catch(err => console.log(err))

// }

// function renderMovies(movies) {
//     let output = '';
//     for (var i = 0; i < movies.length; i++) {
//         var Poster = movies[i].Poster;
//         var Title = movies[i].Title;
//         var ID = movies[i].imdbID;

//         output += `
//                 <div class="movies-list">
//                     <div class="movie">
//                     <img src="${Poster}">
//                     <div class="title">${Title}</div>
//                     <a onClick="moviesSelected('${ID}')" class="btn btn-primary" href="#">Movie Details</a>
//                     </div>
//                 </div>
//                 `;
//     }
//     document.querySelector('#movies').innerHTML = output;


// }

// function moviesSelected(ID) {

//     sessionStorage.setItem('movieId', ID);
//     window.location = 'movie.html';
//     return false;

// }

// function getMovie() {
//     let movieId = sessionStorage.getItem('movieId');


//     fetch(`https://www.omdbapi.com?i=${movieId}&apikey=338f9a63`)
//         .then(res => res.json())
//         .then(movie => renderMovie(movie))
//         .catch();

// }

// function renderMovie(movie) {

//     let output = `
//             <div class="row">
//                 <div class="col-md-4">
//                     <img src="${movie.Poster}">
//                 </div>

//                 <div class="col-md-8">
//                 <h2>${movie.Title}</h2>
//                 <ul class="list-group">
//                     <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
//                     <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
//                     <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
//                     <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
//                     <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
//                     <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
//                     <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
//                 </ul>

//                 </div>
//             </div>

//             <div class="row">
//                 <div class="well">
//                     <h3>Plot</h3>${movie.Plot}
//                     <hr>
//                     <a href="http://imdb.com/title/${movie.imdbID} "target="_blank " class="btn btn - primary">View IMDB</a> 
//                     <a href = "index.html" class = "btn btn-default"> Go Back to Search </a> 
//                 </div> 
//             </div>`;

//     document.querySelector('#movie').innerHTML = output;
// }
