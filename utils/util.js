export const getArrayFilms = async (url) =>{
    const response = await fetch(url);
    const data = await response.json();
    return data
}

export const printFilms = async (objeto) =>{
    const section = document.querySelector('section');
    section.innerHTML=''
    objeto.results.forEach(element => {
        section.innerHTML +=`
                            <div class="films flex">
                                <p>${element.title}</p>
                                <div class="divImg" style="background-image: url('https://image.tmdb.org/t/p/original${element.poster_path}')"></div>
                                <span>${element.release_date}</span>
                            </div>
                            `
        
    });

}