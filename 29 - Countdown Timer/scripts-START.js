let countdown;
const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');

function timer(seconds){
    clearInterval(countdown);

    const now = Date.now();
    const then = now + ( seconds * 1000);
    showSeconds(seconds);
    endTime(then);

    countdown = setInterval(() => {
        let secondsRemain = Math.round((then - Date.now()) / 1000);
        if( secondsRemain < 0){
            clearInterval(countdown);
            return;
        }
        showSeconds(secondsRemain);
    }, 1000);
}

function showSeconds(sec){
   const minutes = Math.floor(sec / 60);
   const secondsLeft = sec % 60;
   timeLeft.innerHTML = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
   document.title = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

function endTime(stamp){
    const data = new Date(stamp);
    const dataHours = data.getHours();
    const dataMinutes = data.getMinutes();

    timeEnd.innerHTML = `Таймер остановится в ${dataHours>12 ? dataHours-12 : dataHours}:${dataMinutes < 10 ? '0' : ''}${dataMinutes}`;
}

function timeFunction(e){
    timer(this.dataset.time);
}


buttons.forEach( button => button.addEventListener('click', timeFunction));

document.customForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const textMinutes = parseInt(document.customForm.minutes.value);
    timer((textMinutes * 60));
    document.customForm.reset();
})