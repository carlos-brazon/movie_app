import { getArrayFilms, printFilms, eventoClickStar } from "../utils/util.js";

const form = document.querySelector('form');
const input = document.querySelector('#buscadorPelicula');
const data = JSON.parse(localStorage.getItem('data')) || [];
const counterHeader = document.querySelectorAll('.p-small');
counterHeader[0].innerHTML = data.length;

const buttonMoreLess = document.querySelectorAll('.buttons button');
console.log(buttonMoreLess);

let number = 1;
buttonMoreLess.forEach(element => {
    element.addEventListener('click', async (event) => {
        if (element.innerHTML.includes('Next') && number >= 0) {
            number += 1;
            element.innerHTML = `Next page ${number + 1}`;
            buttonMoreLess[0].innerHTML = `Previous page ${number - 1}`;
        }

        if (element.innerHTML.includes('Previous') && number >= 2) {
            number -= 1;
            element.innerHTML = `Previous page ${number - 1}`
            buttonMoreLess[1].innerHTML = `Next page ${number + 1}`
            if (buttonMoreLess[0].innerHTML.includes('0')) {
                element.innerHTML = `Previous page`
            }
        }
        console.log(number);

        const urlPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=156de9a632e94cfb9b9a113793c69ef8&page=${number}`
        const arrayPopularMovies = await getArrayFilms(urlPopularMovies);
        printFilms(arrayPopularMovies.results);
    });
    console.log(number);
});

const urlPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=156de9a632e94cfb9b9a113793c69ef8&page=${number}`
const arrayPopularMovies = await getArrayFilms(urlPopularMovies);
printFilms(arrayPopularMovies.results);
console.log(data);

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let value = input.value;
    console.log(value);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=156de9a632e94cfb9b9a113793c69ef8&query=${value}`

    const objetoFilms = await getArrayFilms(url);
    console.log(objetoFilms);
    printFilms(objetoFilms.results);

});


