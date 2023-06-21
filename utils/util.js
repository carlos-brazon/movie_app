export const getArrayFilms = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

export const printFilms = async (objeto) => {
    const section = document.querySelector('section');
    const data = JSON.parse(localStorage.getItem('data')) || [];
    section.innerHTML = ''
    objeto.forEach(element => {
        const existe = data.find(id => id.id == element.id);
        section.innerHTML += `
                                <div class="films flex" ${existe ? 'style=" box-shadow: 0px 0px 15px rgba(34, 255, 0, 0.5);"' : 'style=" box-shadow: 0px 0px 15px rgb(153, 80, 80);"'}>
                                    <a href="/proyectos-github/movie_app/pages/movie.html?id=${element.id}">
                                        <div class="principal">
                                            <div class="titleMovie flex">
                                                <h2>${element.title}</h2>
                                            </div>                    
                                            <div class="divImg" style="background-image: url('https://image.tmdb.org/t/p/original${element.poster_path}')"></div>
                                        </div>
                                    </a>
                                    <div class="contain-star flex">
                                        <span>${element.release_date}</span>
                                        <i class="${existe ? 'fa-solid' : "fa-regular"} fa-star" ${existe ? 'style="color: rgb(34, 255, 0)"' : ''}></i>
                                    </div>
                                </div>
                            `
    });
    const stars = document.querySelectorAll('.films .fa-star');
    stars.forEach((element, i) => {

        element.addEventListener('click', event => {
            eventoClickStar(element, objeto[i])
        })
    })

}

export const printOneFilm = async (movie) => {
    console.log(movie.credits.crew);
    const director = (movie.credits.crew).filter(person => person.job == "Director");
    console.log(director);
    const section = document.querySelector('section');
    const body = document.querySelector('body');
    body.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movie.poster_path}")`
    section.innerHTML = `
                                <div class="oneFilm flex")">
                                    <p>Titulo: ${movie.title}</p>
                                    <div class="divImg" style="background-image: url('https://image.tmdb.org/t/p/original${movie.poster_path}')"></div>
                                    <span>Año de estreno: ${movie.release_date}</span>
                                    <span>Tiempo de duracion: ${movie.runtime} minutos</span>
                                    <span>Director: ${director[0].name}</span>
                                    <span>Sinopsis: ${movie.overview}</span>
                                    <i class="fa-sharp fa-regular fa-star"></i>
                                </div>
                   
                            `
    const stars = document.querySelectorAll('.oneFilm .fa-star');
    console.log(stars);
    stars.forEach((element, i) => {

        element.addEventListener('click', event => {
            eventoClickStar(element, movie)
        })
    })
}

export const printFilmsFavourites = async (arrayMovies) => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    // movies.forEach(element => {
    //     data.unshift({ id: element.id })
    //     console.log({ id: element.id });
    // });
    const section = document.querySelector('section');
    section.innerHTML = '';
    arrayMovies.forEach(movie => {
        section.innerHTML += `
                            <div class="films flex" style="border: none; box-shadow: 0px 0px 30px rgba(120, 120, 120, 0.5);">
                                <a href="/proyectos-github/movie_app/pages/movie.html?id=${movie.id}">
                                    <div class="principal">
                                        <div class="titleMovie flex">
                                            <h2>${movie.title}</h2>
                                        </div>                    
                                        <div class="divImg" style="background-image: url('${movie.poster_path == undefined ? movie.url : 'https://image.tmdb.org/t/p/original' + movie.poster_path}')"></div>
                                    </div>
                                </a>
                                <div class="contain-star flex">
                                    <span>${movie.release_date}</span>
                                    <i class="fa-sharp fa-regular fa-star"></i>
                                </div>
                            </div>
                            `
    });
    const buttons = document.querySelectorAll('.films .fa-star');
    buttons.forEach((element, i) => {
        element.addEventListener('click', async (event) => {
            section.innerHTML = ''
            const movieDeleted = data.filter(obj => Number(obj.id) !== arrayMovies[i].id);
            const movieDeleted2 = movies.filter(obj => Number(obj.id) !== arrayMovies[i].id);
            console.log(movieDeleted);
            console.log(movieDeleted2);
            localStorage.setItem("data", JSON.stringify(movieDeleted));
            localStorage.setItem("movies", JSON.stringify(movieDeleted2));

            const data2 = JSON.parse(localStorage.getItem('data')) || [];
            const movies2 = JSON.parse(localStorage.getItem('movies')) || [];
            const newArrayMovies =  await arrayNewMovies(data2)
            movies2.forEach(element => {
                newArrayMovies.unshift(element);
            });
            const counterHeader = document.querySelector('.p-small');
            counterHeader.innerHTML = data2.length;

                console.log(newArrayMovies);
            printFilmsFavourites(newArrayMovies);
        });
    });

}

export const arrayNewMovies = async (arrayId) => {
    const arrayMovies = await Promise.all(arrayId.map(async (element) => {
        let urlId = `https://api.themoviedb.org/3/movie/${element.id}?api_key=156de9a632e94cfb9b9a113793c69ef8&language=en-ES`;
        const objetoMovie = await getArrayFilms(urlId);
        return objetoMovie
    }));
    return arrayMovies
}

export const eventoClickStar = async (element, { id }) => {
    console.log(id);
    const local = JSON.parse(localStorage.getItem('data')) || [];
    let data;

    if (element.classList[0] == 'fa-solid') {
        element.classList = 'fa-regular fa-star'
        element.style.color = 'white'
        element.offsetParent.style.boxShadow = '0px 0px 15px rgba(153, 80, 80, 0.5)'
        data = local.filter(elemen => elemen.id !== id);
        const counterHeader = document.querySelectorAll('.p-small');
        counterHeader[0].innerHTML = data.length;
    } else {
        element.classList = 'fa-solid fa-star'
        element.style.color = 'rgb(34, 255, 0)'
        element.offsetParent.style.boxShadow = '0px 0px 15px rgba(34, 255, 0, 0.5)'
        local.push({
            id: id
        });
        data = local
        const counterHeader = document.querySelectorAll('.p-small');
        counterHeader[0].innerHTML = data.length;
    }
    localStorage.setItem("data", JSON.stringify(data));
}

const filterArray = (array, id) => {
    const movieDeleted = array.filter(obj => Number(obj.id) !== arrayMovies[i].id);
}