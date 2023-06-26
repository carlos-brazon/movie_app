import { arrayNewMovies, printFilms, printFilmsFavourites } from "../utils/util.js";

const form = document.querySelector('form');
const input = document.querySelector('#buscadorPelicula');
const counterHeader = document.querySelector('.p-small');
const data = JSON.parse(localStorage.getItem('data')) || [];

const arrayFromAppi = await arrayNewMovies(data);
const movies = JSON.parse(localStorage.getItem('movies')) || [];
movies.forEach(element => {
    arrayFromAppi.unshift(element)
});

counterHeader.innerHTML = arrayFromAppi.length;
printFilmsFavourites(arrayFromAppi);

    
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let value = input.value;
    const results = (await arrayNewMovies(data));
    const movies = JSON.parse(localStorage.getItem('movies'));
    movies.forEach(element => {
        results.unshift(element);
    });
    
    const resultInpunSearch = results.filter(movie => (movie.title).toLowerCase().includes(value.toLowerCase()));
    printFilmsFavourites(resultInpunSearch);
});