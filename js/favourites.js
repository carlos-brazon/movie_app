import { arrayNewMovies, printFilms, printFilmsFavourites } from "../utils/util.js";

const form = document.querySelector('form');
const input = document.querySelector('#buscadorPelicula');
const counterHeader = document.querySelector('.p-small');
const data = JSON.parse(localStorage.getItem('data')) || [];

const arrayFromAppi = await arrayNewMovies(data);
const movies = JSON.parse(localStorage.getItem('movies')) || [];
console.log(movies)
movies.forEach(element => {
    arrayFromAppi.unshift(element)
});

counterHeader.innerHTML = arrayFromAppi.length;
console.log(arrayFromAppi);
printFilmsFavourites(arrayFromAppi);


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let value = input.value;
    const resultInpunSearch = (await arrayNewMovies(data)).filter(movie => (movie.title).toLowerCase().includes(value.toLowerCase()));
    const movies = JSON.parse(localStorage.getItem('movies'));
    console.log(movies);
    movies.forEach(element => {
        resultInpunSearch.unshift(element);
    });
    console.log(resultInpunSearch);
    printFilmsFavourites(resultInpunSearch);
});