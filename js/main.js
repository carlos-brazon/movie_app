import { getArrayFilms, printFilms } from "../utils/util.js";

const form = document.querySelector('form');
const input = document.querySelector('#buscadorPelicula');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let value = input.value;
    console.log(value);
    const url = `https://api.themoviedb.org/3/search/movie?api_key=156de9a632e94cfb9b9a113793c69ef8&query=${value}`
    
    const objetoFilms = await getArrayFilms(url);
    printFilms(objetoFilms)



})