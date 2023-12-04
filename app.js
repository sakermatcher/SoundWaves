let audioObjects = [];
let playing = -1;

    const soundwaves = [
        { name: 'Theta', src: 'theta.mp3', time:720},
        { name: 'Alfa', src: 'alfa.mp3', time:720},
    ];

    audioObjects = soundwaves.map(soundwave => new Audio(soundwave.src));


function togglePlay(index) {
    if (playing == index) {
        document.getElementById('frq'+index).classList.add('fa-play');
        document.getElementById('frq'+index).classList.remove('fa-pause');
        audioObjects[index].pause();
        playing = -1;
    }
    else {
        audioObjects.forEach(audio => audio.pause());
        try {
        playing= document.getElementsByClassName('fa-pause')[0];
        playing.classList.remove('fa-pause');
        playing.classList.add('fa-play');
        } catch (error) {}

        document.getElementById('frq'+index).classList.remove('fa-play');
        document.getElementById('frq'+index).classList.add('fa-pause');
        audioObjects[index].play();
        playing = index;
    }
}

function updateTime(index, value) {
    // Add time update functionality here
        audioObjects[index].currentTime = Number(value) * soundwaves[index].time / 100;
}

setTimeout(() => {
    audioObjects.forEach(audio => {
        audio.addEventListener('timeupdate', () => {
            document.getElementById('time'+playing).value = audio.currentTime * 100 / audio.duration;
        
            if (audio.currentTime == audio.duration) {
                document.getElementById('time'+playing).value = 0;
                togglePlay(playing);
            }
        })
    })
}, 50000);

function toggleCSS() {
    if (window.innerWidth < 1000) {
        document.getElementById('type').href = 'phone.css';
    }
    else {
        document.getElementById('type').href = 'desktop.css';
    }
}

document.addEventListener('DOMContentLoaded', toggleCSS())

window.onresize = toggleCSS;