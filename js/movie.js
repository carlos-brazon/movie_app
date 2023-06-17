import { getArrayFilms, printOneFilm } from "../utils/util.js";
const x = window.location.search;
const y = new URLSearchParams(x);
const id = y.get('id');
console.log(id);
let urlId = `https://api.themoviedb.org/3/movie/${id}?api_key=156de9a632e94cfb9b9a113793c69ef8&language=en-ES`;
const counterHeader = document.querySelectorAll('.p-small');
const data = JSON.parse(localStorage.getItem('data')) || [];
counterHeader[0].innerHTML= data.length;

const inicial = async () => {
    
    const film = await getArrayFilms(urlId);
    console.log(film);
    printOneFilm(film);
    
    const button = document.querySelector('button');
    button.addEventListener('click', async (event) =>{
        const data = JSON.parse(localStorage.getItem('data')) || [];
        
        console.log(data);
        
        const repeatMovie = data.find(movie => movie.id==id);
        if (repeatMovie) {
            console.log('si es igual el id');
            window.alert('La pelicula ya se encuentra en favoritos')
        } else {
            const filmData = {
                id: id
            }
            data.push(filmData);
            localStorage.setItem("data", JSON.stringify(data));
        };
        counterHeader[0].innerHTML= data.length;
    });
}
inicial();
