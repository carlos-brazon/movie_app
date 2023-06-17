export const getArrayFilms = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

export const printFilms = async (objeto) => {
    const section = document.querySelector('section');
    section.innerHTML = ''
    objeto.forEach(element => {
        section.innerHTML += `
                            <a href="/proyectos-github/movie_app/pages/movie.html?id=${element.id} "target="_blank">
                                <div class="films flex">
                                    <p>${element.title}</p>
                                    <div class="divImg" style="background-image: url('https://image.tmdb.org/t/p/original${element.poster_path}')"></div>
                                    <span>${element.release_date}</span>
                                </div>
                            </a>
                            `

    });

}
export const printFilmsFavourites = async (objeto) => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const section = document.querySelector('section');
    section.innerHTML = ''
    objeto.forEach(element => {
        section.innerHTML += `
                        <div class="contaimerMovie">
                            <a href="/proyectos-github/movie_app/pages/movie.html?id=${element.id} "target="_blank">
                                <div class="films flex">
                                    <p>${element.title}</p>
                                    <div class="divImg" style="background-image: url('https://image.tmdb.org/t/p/original${element.poster_path}')"></div>
                                    <span>${element.release_date}</span>
                                </div>
                            </a>
                            <button>Eliminar</button>
                        </div>
                            `
                        });
                        const buttons = document.querySelectorAll('button');
                        buttons.forEach((element, i) => {
                            element.addEventListener('click', async (event) => {
                                section.innerHTML = ''
                                const movieDeleted = data.filter(obj => Number(obj.id) !== objeto[i].id);
                                console.log(movieDeleted);
                                localStorage.setItem("data", JSON.stringify(movieDeleted));
                                
                                const data2 = JSON.parse(localStorage.getItem('data')) || [];
                                let arrayNewMovies = await Promise.all(data2.map(async (element) => {
                                    let urlId = `https://api.themoviedb.org/3/movie/${element.id}?api_key=156de9a632e94cfb9b9a113793c69ef8&language=en-ES`;
                                    const objetoFilms = await getArrayFilms(urlId);
                                    return objetoFilms
                                }));
                                printFilmsFavourites(arrayNewMovies);
                        
        });
    });

}
export const printOneFilm = async (movie) => {
    const section = document.querySelector('section');
    section.innerHTML = `
                                <div class="oneFilm flex")">
                                    <p>Titulo: ${movie.title}</p>
                                    <div class="divImg" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster_path}')"></div>
                                    <span>Año de estreno: ${movie.release_date}</span>
                                    <span>Tiempo de duracion: ${movie.runtime} minutos</span>
                                    <span>Director${movie.runtime} minutos</span>
                                    <span>Sinopsis: ${movie.overview}</span>
                                    <button>Añadir</button>
                                </div>
                            `
}