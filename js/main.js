const apikey = 'eeacc269';

$(document).ready(()=> {
    $('#searchForm').on('submit',(e)=> {
        let searchValue= $('#searchText').val();
        getMovies(searchValue);
        e.preventDefault();

    });
});

function getMovies(searchValue) {
    axios.get(`http://www.omdbapi.com?s=${searchValue}&apikey=${apikey}`).then((res)=> {
        console.log(res);
        let movies = res.data.Search;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
            <div class = "col-md-3">
                <div class="well text-center">
                <img src="${movie.Poster}">
                <h5>${movie.Title}</h5>
                <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            `
        });
        $('#movies').html(output);
    }).catch((err)=> {
        console.log(err);
    });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`http://www.omdbapi.com?i=${movieId}&apikey=${apikey}`).then((res)=> {
        console.log(res);
        let movie =res.data;

        let output =`
        <div class="row">
            <div class="col-md-4">
                <img src="${movie.Poster}" class="thumbnail"/>
            </div>
        <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
                <li class="list-group-item">
                <strong>Genre:</strong> ${movie.Genre}
                </li>
                <li class="list-group-item">
                <strong>Released:</strong> ${movie.Released}
                </li>
                <li class="list-group-item">
                <strong>Rated:</strong> ${movie.imdbRating}
                </li>
                <li class="list-group-item">
                <strong>Director:</strong> ${movie.Director}
                </li>
                <li class="list-group-item">
                <strong>Writer:</strong> ${movie.Writer}
                </li>
                <li class="list-group-item">
                <strong>Actors:</strong> ${movie.Actors}
                </li>
            </ul>
        </div>
        </div>
        <div class="row">
            <div class="well">
            <h3>${movie.Plot}</h3>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB </a>
            <a href="index.html" class="btn btn-primary">Go back to search</a>
            </div>
        </div>
        `;

        $('#movie').html(output);

    }).catch((err)=> {
        console.log(err);
    });
}