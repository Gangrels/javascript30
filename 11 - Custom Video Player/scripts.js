//Variables
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const full = player.querySelectorAll('.full');


//Functions
function playPause() {
    if (video.paused){
        video.play();
        toggle.innerHTML = '| |';
    }
    else{
        video.pause();
        toggle.innerHTML = '►';
    }
}

function skipFunction(){

   video.currentTime += +this.dataset.skip;

   if (video.currentTime < 0){
    video.currentTime = 0;
   }
}

function changeRange(){
    if (this.name == 'volume'){
        video.volume = +this.value;

    }
    else{
        video.playbackRate = +this.value;
    }
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const time = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = time;
}

function fullScreenToggle(){
    video.webkitRequestFullscreen();
}

//Event Listeners
video.addEventListener('click', playPause);
toggle.addEventListener('click', playPause);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach( button => {
    button.addEventListener('click', skipFunction);
})

ranges.forEach( range => {
    range.addEventListener('input', changeRange);
})

ranges.forEach( range => {
    range.addEventListener('change', changeRange);
})

let mousemove = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mousemove && scrub(e));
progress.addEventListener('mousedown', ()=> mousemove = true);
progress.addEventListener('mouseup', ()=> mousemove = false);


full[0].addEventListener('click', fullScreenToggle);
