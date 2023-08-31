import { eventoClickStar, getArrayFilms, printOneFilm } from "../utils/util.js";
const searchstrig = window.location.search;
const searchObj = new URLSearchParams(searchstrig);
const id = searchObj.get('id');
let urlId = `https://api.themoviedb.org/3/movie/${id}?api_key=156de9a632e94cfb9b9a113793c69ef8&language=es-ES&append_to_response=credits&append_to_response=videos`;
const counterHeader = document.querySelectorAll('.p-small');
const data = JSON.parse(localStorage.getItem('data')) || [];
const movies = JSON.parse(localStorage.getItem('movies')) || [];

counterHeader[0].innerHTML = data.length + movies.length;

const inicial = async () => {
    const movie = await getArrayFilms(urlId);

    if (movie.success == undefined) {
        await printOneFilm(movie, id);
    }
    if (movie.success === false) {
        const movieInF = movies.find(movie => movie.id == id);
        if (movieInF) {
            await printOneFilm(movieInF, id);
        }
        else {
            const movies3 = JSON.parse(localStorage.getItem('movies3')) || [];
            const movieOutF = movies3.find(movie => movie.id == id);
            await printOneFilm(movieOutF, id);
        }
    }
}
inicial();
