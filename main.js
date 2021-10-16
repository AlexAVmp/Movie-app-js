const API_KEY = 'api_key=e547e72aba475ed3c51f9ef14847ee6d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?primary_release_date.gte=2021-01-01&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const header = document.createElement('header');
document.body.prepend(header);
header.classList.add('header')

const form = document.createElement('form');
header.appendChild(form);
form.classList.add('header__form');

const input = document.createElement('input');
form.appendChild(input);
input.classList.add('header__search');
input.setAttribute('type', 'text');

const main = document.createElement('main');
header.after(main);

const prev = document.getElementById('prev');
const current = document.getElementById('current');
const next = document.getElementById('next');

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;

getMovies(API_URL);

function getMovies(url) {
    lastUrl = url;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.results.length !== 0) {
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages 

            current.innerText = currentPage;
             
            if (currentPage <= 1){
                prev.classList.add('disabled');
                next.classList.remove('disabled');
            } else if (currentPage >= totalPages) {
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            } else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
            }

        } else {
            main.innerHTML = `<h1>No results found</h1>`
        }
    })
}

function showMovies(data) {
    main.innerHTML = '';

    data.forEach((movie) => {
    const {title, poster_path, vote_average, overview} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
        <img class='logo' src='${IMG_URL+poster_path}' alt='{$title}'>
        <div class='movie_info'>
            <h3>${title}</h3>
            <div class='${getColor(vote_average)}'>${vote_average}</div>
        </div>
        <div class='review'>
            <h3>Review</h3>
            ${overview}
        </div>
    `
    main.appendChild(movieEl);
    })
}

function getColor(vote){
    if (vote > 9) {
        return 'green';
    } else if (vote >= 6) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (element) => {
    element.preventDefault();

    const searchForm = input.value;

    if (searchForm) {
        getMovies(searchURL+'&query='+searchForm)
    } else {
        getMovies(API_URL);
    }
})

prev.addEventListener('click', () => {
    if (prevPage > 0) {
        getNewPage(prevPage);
    }
})

next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        getNewPage(nextPage);
    }
})

function getNewPage(page) {
    let urlSplit = lastUrl.split('?');
    let queryParam = urlSplit[1].split('&');
    let key = queryParam[queryParam.length -1].split('=');
    if (key[0] != 'page') {
        let url = lastUrl + '&page='+page;
        getMovies(url); 
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParam[queryParam.length -1] = a
        let b = queryParam.join('&');
        let url = urlSplit[0] +'?'+ b;
        getMovies(url); 
    }
}