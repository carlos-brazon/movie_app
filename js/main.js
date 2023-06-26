import { getArrayFilms, printFilms, sumaPopularMoviesandCreatedMovies } from "../utils/util.js";
const form = document.querySelector('form');
const input = document.querySelector('#buscadorPelicula');
const data = JSON.parse(localStorage.getItem('data')) || [];
const movies = JSON.parse(localStorage.getItem('movies')) || [];
const counterHeader = document.querySelectorAll('.p-small');
counterHeader[0].innerHTML = data.length + movies.length;
let number = 1;

const array = await sumaPopularMoviesandCreatedMovies(number);
printFilms(array.arrayPopularMovies, array.popularMoviesFromApi, array.movies3);

const buttonMoreLess = document.querySelectorAll('.buttons button');
buttonMoreLess.forEach(element => {
    element.addEventListener('click', async (event) => {
        if (element.innerHTML.includes('Next') && number >= 0) {
            element.classList.add("noclicked");
            number += 1;
            element.innerHTML = `Next page ${number + 1}`;
            buttonMoreLess[0].innerHTML = `Previous page ${number - 1}`;
        }
        
        if (element.innerHTML.includes('Previous') && number >= 2) {
            element.classList.add("clicked");
            number -= 1;
            element.innerHTML = `Previous page ${number - 1}`
            buttonMoreLess[1].innerHTML = `Next page ${number + 1}`
            if (buttonMoreLess[0].innerHTML.includes('0')) {
                element.innerHTML = `Previous page`
            }
        }
        setTimeout(function() {
            element.classList.remove("clicked");
            element.classList.remove("noclicked");
          }, 300);
        const array = await sumaPopularMoviesandCreatedMovies(number);
        printFilms(array.arrayPopularMovies, array.popularMoviesFromApi, array.movies3);
    });
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let value = input.value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=156de9a632e94cfb9b9a113793c69ef8&query=${value}`
    if (value == '') {
        const array = await sumaPopularMoviesandCreatedMovies(number, value);
        printFilms(array.arrayPopularMovies);
    }
    else {
        const array = await sumaPopularMoviesandCreatedMovies(number, url);
        printFilms(array.arrayPopularMovies);
    }

})


