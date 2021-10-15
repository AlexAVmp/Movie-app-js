const API_KEY = 'api_key=e547e72aba475ed3c51f9ef14847ee6d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?primary_release_year=2021&sort_by=vote_average.desc&'+API_KEY;

getMovies(API_URL);

function getMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showMovies();
    })
}

function showMovies() {

}