const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo= document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado =new Audio('./sonidos/beep.mp3');


let tiempoTranscurridoEnSegundos = 2700;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 600
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 2700
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
} )

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1200
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})

function cambiarContexto(contexto){
    mostrarTiempo();
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto){
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro?
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie
            <strong class="app__title-strong">¡Haz una pausa larga!</strong>`
        


        default:
            break;
    }
}

const cuentaRegresiva = () =>{
    if(tiempoTranscurridoEnSegundos <= 0){
        audioTiempoFinalizado.play();
        alert('Tiempo finalizado');
        reiniciar();
        return
    }

    textoIniciarPausar.textContent = "Pausar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/pause.png`);
    
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo();
    console.log('Id: ' + intervaloId); // Muestra el ID actual
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(idIntervalo){
        audioPausa.play();
        reiniciar();
        return // retorno anticipado -- circuit breaker
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000)
}

function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoIniciarPausar.textContent = "Comenzar";
    iconoIniciarPausar.setAttribute('src', `/imagenes/play_arrow.png`);
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-CO', {minute:'2-digit', second:'2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()