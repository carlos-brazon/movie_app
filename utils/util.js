export const getArrayFilms = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data
}

export const printFilms = async (arrayObjeto, true1, true2) => {
    const section = document.querySelector('section');
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    section.innerHTML = '';

    arrayObjeto.forEach(element => {
        const existe = data.find(id => id.id == element.id);
        const existe2 = movies.find(id => id.id == element.id);
        section.innerHTML += `
                                <div class="films flex ${existe || existe2 ? 'green' : 'red'}">
                                    <a href="/proyectos-github/movie_app/pages/movie.html?id=${element.id}">
                                        <div class="principal">
                                            <div class="titleMovie flex">
                                                <h2>${element.title}</h2>
                                            </div>                    
                                            <div class="divImg" style="background-image: url('${element.poster_path == undefined ? element.url : 'https://image.tmdb.org/t/p/original' + element.poster_path}')"></div>
                                        </div>
                                    </a>
                                    <div class="contain-star flex">
                                        <span>${element.release_date}</span>
                                        <p class="movieId">${element.id}</p>
                                        <i class="${existe || existe2 ? 'fa-solid' : "fa-regular"} fa-star" ${existe || existe2 ? 'style="color: rgb(34, 255, 0)"' : ''}></i>
                                    </div>
                                </div>
                            `
    });

    const stars = document.querySelectorAll('.films .fa-star');
    stars.forEach((element, i) => {
        element.addEventListener('click', event => {
            const idFronEven = event.target.parentElement.children[1].innerText;
            deleteMovie(idFronEven, arrayObjeto[i]);
            eventoClickStar(element);
        });
    })

}

export const printOneFilm = async (movie, id) => {
    const director = movie.credits?.crew.filter(person => person.job == "Director") || [{ name: movie.director }]
    const trailer = movie.videos?.results.filter(person => person.name.includes("Tráiler")) || [{ trailer: movie.key }]
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const true1 = data.find(movieid => movieid.id == id);
    const true2 = movies.find(movieid => movieid.id == id);


    const section = document.querySelector('section');
    const body = document.querySelector('body');
    body.style.backgroundImage = `url("${movie.poster_path == undefined ? movie.url : 'https://image.tmdb.org/t/p/original' + movie.poster_path}")`
    section.innerHTML = `
                                <div class="oneFilm flex ${true1 || true2 ? 'green' : 'red'}">
                                    <h2>Titulo: ${movie.title}</h2>
                                    <div class="divImg" style="background-image: url('${movie.poster_path == undefined ? movie.url : 'https://image.tmdb.org/t/p/original' + movie.poster_path}')"></div>
                                    <span>Año de estreno: ${movie.release_date}</span>
                                    <span>Tiempo de duracion: ${movie.runtime} minutos</span>
                                    <span>Director: ${director[0].name}</span>
                                    <span>Sinopsis: ${movie.overview}</span>
                                    <i class="${true1 || true2 ? 'fa-solid' : "fa-regular"} fa-star" ${true1 || true2 ? 'style="color: rgb(34, 255, 0)"' : ''}></i>
                                </div>
                                <div> 
                                    <iframe width="620px" height="300px" src="https://www.youtube.com/embed/${trailer[0]?.key}?autoplay=1&start=7&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </div>
                   
                            `
    const stars = document.querySelectorAll('.oneFilm .fa-star');
    stars.forEach((element, i) => {

        const oneFilm = document.querySelector('.oneFilm');
        element.addEventListener('click', event => {
            deleteMovie(id, movie);
            eventoClickStar(element);
            if (oneFilm.classList[0].includes('films')) {
                oneFilm.classList.replace('films', 'oneFilm');
            } else {
                oneFilm.classList.replace('oneFilm', 'films');
            }

        });

    })
}

export const printFilmsFavourites = async (arrayMovies) => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const section = document.querySelector('section');
    const counterHeader = document.querySelector('.p-small');
    section.innerHTML = '';
    counterHeader.innerHTML = data.length + movies.length;
            if (counterHeader.innerHTML==0) {
                section.innerHTML='There is not movies'
            }
    arrayMovies.forEach(movie => {
        section.innerHTML += `
                            <div class="films flex green">
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
                                    <i class="fa-sharp fa-solid fa-star" style="color:rgb(34, 255, 0);"></i>
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
            const movieDeleted3 = movies.filter(obj => Number(obj.id) !== arrayMovies[i].id);
            localStorage.setItem("data", JSON.stringify(movieDeleted));
            localStorage.setItem("movies", JSON.stringify(movieDeleted2));
            localStorage.setItem("movies3", JSON.stringify(movieDeleted3));            
            
            const newArrayMovies = [...await arrayNewMovies(movieDeleted)]
            movieDeleted2.forEach(element => {
                newArrayMovies.unshift(element);
            });
            printFilmsFavourites(newArrayMovies);
            counterHeader.innerHTML = movieDeleted.length + movieDeleted2.length;
            if (counterHeader.innerHTML==0) {
                section.innerHTML='There is not movies'
            }
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

export const eventoClickStar = async (element) => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const moviesLocal = JSON.parse(localStorage.getItem('movies')) || [];

    if (element.classList[0] == 'fa-solid') {
        element.classList = 'fa-regular fa-star';
        element.style.color = 'white';
        element.offsetParent.classList = 'films flex red';
        const counterHeader = document.querySelectorAll('.p-small');
        counterHeader[0].innerHTML = data.length + moviesLocal.length;
    } else {
        element.classList = 'fa-solid fa-star';
        element.style.color = 'rgb(34, 255, 0)';
        element.offsetParent.classList = 'films flex green';
        const counterHeader = document.querySelectorAll('.p-small');
        counterHeader[0].innerHTML = data.length + moviesLocal.length;
    }

}

export const deleteMovie = async (id, arrayObjeto) => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const allMoviesInLocal = [...movies];
    data.forEach(element => {
        allMoviesInLocal.push(element);
    });

    const valor = allMoviesInLocal.find(movie => movie.id == id);
    if (valor && id.length >= 10) {
        const arrayObjetosMovies = movies.filter(movie => movie.id !== arrayObjeto.id);
        localStorage.setItem("movies", JSON.stringify(arrayObjetosMovies));
    }

    if (valor && id.length < 10) {
        const arrayId = data.filter(movie => movie.id !== id);
        localStorage.setItem("data", JSON.stringify(arrayId));
    }

    if (valor == undefined && id.length >= 10) {
        movies.push(arrayObjeto);
        localStorage.setItem("movies", JSON.stringify(movies));
    }
    if (valor == undefined && id.length < 9) {
        data.push({ id: id });
        localStorage.setItem("data", JSON.stringify(data));
    }
}

export const sumaPopularMoviesandCreatedMovies = async (number, value) =>{
    if (!value=='') { 
        const url = `https://api.themoviedb.org/3/search/movie?api_key=156de9a632e94cfb9b9a113793c69ef8&query=${value}`
        const popularMoviesFromApi = await getArrayFilms(url);
        const arrayPopularMovies = [...popularMoviesFromApi.results];
        const movies3 = JSON.parse(localStorage.getItem('movies3')) || [];
        movies3.forEach(element => {
            arrayPopularMovies.unshift(element);
        });
        return {arrayPopularMovies: arrayPopularMovies ,
             popularMoviesFromApi: popularMoviesFromApi.results,
              movies3: movies3}
    }
   
        const urlPopularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=156de9a632e94cfb9b9a113793c69ef8&page=${number}`
        const popularMoviesFromApi = await getArrayFilms(urlPopularMovies);
        const arrayPopularMovies = [...popularMoviesFromApi.results];
        const movies3 = JSON.parse(localStorage.getItem('movies3')) || [];
        movies3.forEach(element => {
            arrayPopularMovies.unshift(element);
        });
        return {arrayPopularMovies: arrayPopularMovies ,
             popularMoviesFromApi: popularMoviesFromApi.results,
              movies3: movies3}
}