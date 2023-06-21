import { getArrayFilms, printOneFilm } from "../utils/util.js";
const x = window.location.search;
const y = new URLSearchParams(x);
const id = y.get('id');
console.log(id);
const star = document.querySelector('.fa-star');
let urlId = `https://api.themoviedb.org/3/movie/${id}?api_key=156de9a632e94cfb9b9a113793c69ef8&language=es-ES&append_to_response=credits`;
const counterHeader = document.querySelectorAll('.p-small');
const data = JSON.parse(localStorage.getItem('data')) || [];
counterHeader[0].innerHTML= data.length;

const inicial = async () => {
    
    const movie = await getArrayFilms(urlId);
    console.log(movie);
    await printOneFilm(movie);

    const repeatMovie = data.find(movie => movie.id==id);
    if (repeatMovie) {
        const oneFilm = document.querySelector('.oneFilm');
        const star = document.querySelector('.oneFilm .fa-star');
        star.classList='fa-solid fa-star'
        star.style.color='rgba(34, 255, 0, 0.5)'
        oneFilm.style.boxShadow="0px 0px 15px rgb(34, 255, 0)";
        
        oneFilm.style.transition= "0.5s";
        
    } else {
        const star = document.querySelector('.oneFilm .fa-star');
        star.classList='fa-regular fa-star'
        const oneFilm = document.querySelector('.oneFilm');
        oneFilm.style.boxShadow="0px 0px 20px rgb(153, 80, 80)";
    }
}
inicial();
