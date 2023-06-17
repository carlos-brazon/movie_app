import { getArrayFilms, printFilms, printFilmsFavourites } from "../utils/util.js";

const form = document.querySelector('form');
const input = document.querySelector('#buscadorPelicula');
const counterHeader = document.querySelectorAll('.p-small');
const data = JSON.parse(localStorage.getItem('data')) || [];
counterHeader[0].innerHTML = data.length;
console.log(data);

let arrayNewMovies = await Promise.all(data.map(async (element) => {
    let urlId = `https://api.themoviedb.org/3/movie/${element.id}?api_key=156de9a632e94cfb9b9a113793c69ef8&language=en-ES`;
    const objetoFilms = await getArrayFilms(urlId);
    return objetoFilms
}));

printFilmsFavourites(arrayNewMovies);
console.log(arrayNewMovies);

// const buttons = document.querySelectorAll('button');
// buttons.forEach((element, i) => {
//     element.addEventListener('click', async (event) => {
//         const data = JSON.parse(localStorage.getItem('data')) || [];
//         let arrayNewMovies = await Promise.all(data.map(async (element) => {
//             let urlId = `https://api.themoviedb.org/3/movie/${element.id}?api_key=156de9a632e94cfb9b9a113793c69ef8&language=en-ES`;
//             const objetoFilms = await getArrayFilms(urlId);
//             return objetoFilms
//         }));
//         const movieDeleted = data.filter(obj => Number(obj.id) !== arrayNewMovies[i].id);
//         console.log(movieDeleted);
//         localStorage.setItem("data", JSON.stringify(movieDeleted));
//         printFilmsFavourites(arrayNewMovies2);

//     });
// });

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let value = input.value;
    console.log(value);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=156de9a632e94cfb9b9a113793c69ef8&query=${value}`

    // const objetoFilms = await getArrayFilms(url);
    // console.log(objetoFilms);
});