const audio = document.getElementById('audio');
const btnPlay = document.getElementById('btn-play'); 
const progreso = document.getElementById('progreso');
const tiempoActual = document.getElementById('tiempo-actual');
const tiempoTotal = document.getElementById('tiempo-total');

const controlVolumen = document.getElementById('control-volumen');
const iconoVolumen = document.getElementById('icono-volumen');

const barraProgreso = document.querySelector('.barra-progreso');

function ajustesMusica() {
    if (audio.paused) {
        audio.play();
        btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
    }else{
        audio.pause();
        btnPlay.innerHTML = '<i class="fas fa-play"></i>';
    }
}

btnPlay.addEventListener('click',ajustesMusica);

audio.addEventListener('timeupdate', () => {
    if (audio.duration){
        const porcentaje = (audio.currentTime / audio.duration) * 100;
        if (progreso) {
            progreso.style.width = `${porcentaje}%`;
        }

    let minsActuales = Math.floor(audio.currentTime / 60); 
    let segsActuales = Math.floor(audio.currentTime % 60);
    if (segsActuales < 10) segsActuales = '0' + segsActuales; 
    if (tiempoActual){
        tiempoActual.textContent = `${minsActuales}:${segsActuales}`;
        }
    }
});

function actualizarTiempo() {
    if (audio.duration && tiempoTotal){
        let minsTotal = Math.floor(audio.duration / 60);
        let segsTotal = Math.floor(audio.duration % 60);
        if (segsTotal < 10) segsTotal = '0' + segsTotal;
        if (tiempoTotal){
        tiempoTotal.textContent = `${minsTotal}:${segsTotal}`;
        }
    }
}

audio.addEventListener('loadedmetadata', actualizarTiempo); 
if (audio.readyState >= 1){
    actualizarTiempo();
}

audio.volume = 0.4; 
controlVolumen.addEventListener('input', (e) => {
    const valorVolumen = e.target.value;
    audio.volume = valorVolumen; 

    const porcentaje = valorVolumen * 100; 
    controlVolumen.style.background = `linear-gradient(to right, #ffffff ${porcentaje}%, rgba(255, 255, 255, 0.1) ${porcentaje}%)`;

    if (valorVolumen == 0) {
        iconoVolumen.className='fas fa-volume-xmark';
    }else if (valorVolumen < 0.5) {
        iconoVolumen.className='fas fa-volume-low';
    }else{
        iconoVolumen.className='fas fa-volume-high';
    }
});

function cambiarProgreso(e) {
    if(audio.duration){
        const anchoTotal = this.clientWidth;
        const clicX = e.offsetX;
        const duracionTotal = audio.duration; 
        audio.currentTime = (clicX / anchoTotal) * duracionTotal; 
    }
}

if (barraProgreso) {
    barraProgreso.addEventListener('click', cambiarProgreso);
}
