
const form = document.querySelector('#form2');
console.log(form);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = {
		title: event.target.titulo.value,
		url: event.target.url.value,	
		release_date: event.target.año.value,	
		runtime: event.target.tiempo.value,	
        director: event.target.director.value,	
        sinopsis: event.target.sinopsis.value,
        // id: 22
        id: Math.round(Math.random()*10**10)
	}
    console.log(user);
const data = JSON.parse(localStorage.getItem('movies')) || []
const idRepetido = data.find(objeto => objeto.id===user.id);
if (idRepetido) {
    console.log('repetido');
        
}
else{
    data.push(user);
    localStorage.setItem('movies', JSON.stringify(data));
}
console.log(data);

});
