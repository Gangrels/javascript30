const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
 navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(data => {
       const videoBlob = window.URL.createObjectURL(data);
       video.src = videoBlob;
       video.play();
    })
    .catch( err => {
        console.log(`ERRRRRRROOOORRRR`,err);
    })
}

function videoToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval ( () => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);

        // //red effect
        // pixels = redEffect(pixels);
        // ctx.putImageData(pixels, 0, 0);

        // //green effect
        // pixels = greenEffect(pixels);
        // ctx.putImageData(pixels, 0, 0);

        // //blue effect
        // pixels = blueEffect(pixels);
        // ctx.putImageData(pixels, 0, 0);

        //rgb spli
        pixels = rgbSplit(pixels);
        ctx.putImageData(pixels, 0, 0);

        //globalAlpha
        // ctx.globalAlpha = 0.08;

        //green Screen
        // pixels = greenScreen(pixels);
        // ctx.putImageData(pixels, 0, 0);
    }, 15);


}

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    let link = document.createElement('a');
    let data = canvas.toDataURL('image/jpeg');
    link.href = data;
    link.setAttribute('download', 'image');
    link.innerHTML = `<img src=${data} alt="Image">`;

    strip.insertBefore(link, strip.firstElementChild);
}

function redEffect(pixels){
    for ( let i = 0; i < pixels.data.length; i += 4){

        pixels.data[i+0] = pixels.data[i+0] + 100;
        pixels.data[i+1] = pixels.data[i+1] - 50;
        pixels.data[i+2] = pixels.data[i+2] * 0.5;

        debugger;
    }
    return pixels;
}

function greenEffect(pixels){
    for ( let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i+0] = pixels.data[i+0] - 200;
        pixels.data[i+1] = pixels.data[i+1] + 100;
        pixels.data[i+2] = pixels.data[i+2] * 0.5;
    }
    return pixels;
}

function blueEffect(pixels){
    for ( let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i+0] = pixels.data[i+0] - 100;
        pixels.data[i+1] = pixels.data[i+1] + 50;
        pixels.data[i+2] = pixels.data[i+2] + 200;
    }
    return pixels;
}

function rgbSplit(pixels){
    for ( let i = 0; i < pixels.data.length; i += 4){
        pixels.data[i - 150] = pixels.data[i+0];
        pixels.data[i + 300] = pixels.data[i+1];
        pixels.data[i - 350] = pixels.data[i+2];
    }
    return pixels;
}

function greenScreen(pixels){
    const levels = {};

    [...document.querySelectorAll('.rgb input')].forEach( input => {
        levels[input.name] = input.value;
    });

    for (  i = 0; i < pixels.data.length; i = i +4){
         red = pixels.data[i+0];
         green = pixels.data[i+1];
         blue = pixels.data[i+2];
         alpha = pixels.data[i+3];

        if (red >= levels.rmin
            && red <= levels.rmax
            && green >= levels.gmin
            && green <= levels.gmax
            && blue >= levels.bmin
            && blue <= levels.bmax){

                pixels.data[i+3] = 0;
            }
    }

return pixels;
}


getVideo();

video.addEventListener('canplay', videoToCanvas);