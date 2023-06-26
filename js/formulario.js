
const form = document.querySelector('#form2');
const input = document.querySelector('#form2 input:last-child');
const mensaje = document.querySelector('.mensaje');
const data = JSON.parse(localStorage.getItem('data')) || [];
const movies = JSON.parse(localStorage.getItem('movies')) || [];
const counterHeader = document.querySelector('.p-small');
counterHeader.innerHTML = data.length + movies.length;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    mensaje.innerHTML = 'The movie has been created'
    mensaje.style.display = 'block';
    setTimeout(function () {
        mensaje.style.display = 'none';
    }, 3000);

    const user = {
        title: event.target.titulo.value,
        url: event.target.url.value,
        release_date: event.target.año.value,
        runtime: event.target.tiempo.value,
        director: event.target.director.value,
        overview: event.target.sinopsis.value,
        // id: 22
        id: Math.round(Math.random() * 10 ** 10)
    }
    const movies3 = JSON.parse(localStorage.getItem('movies3')) || []
    const idRepetido = movies3.find(objeto => objeto.id === user.id);
    if (idRepetido) {
    }
    else {
        movies3.push(user);
        localStorage.setItem('movies3', JSON.stringify(movies3));
    }
    form.reset();
});

document.addEventListener("DOMContentLoaded", function() {
    let mensaje = "Hi! Welcome to the movie creation section."
    let mensajeElemento = document.querySelector("#mensaje");
  
    const mostrarMensaje = (index) => {
      if (index < mensaje.length) {
        mensajeElemento.innerHTML += mensaje.charAt(index);
        setTimeout(function() {
          mostrarMensaje(index + 1);
        }, 100);
      }
    }
    setTimeout(function() {
        mostrarMensaje(0);
      }, 2000);
  });
  