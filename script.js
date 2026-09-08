const audio = document.getElementById("audio");
const enterScreen = document.getElementById("enter-screen");

const playButton = document.getElementById("play-btn");
const nextButton = document.getElementById("next-btn");

const volume = document.getElementById("volume");

const backgroundVideo =
    document.getElementById("background-video");


const playIcon =
    playButton.querySelector("i");


const tracks = [

    {
        name: "rooftop",
        url: "https://r2.guns.lol/7f21016c-c349-4ed3-9658-485ebacbff43.mp3"
    },

    {
        name: "redflag",
        url: "https://r2.guns.lol/5cc27252-4b7d-4941-8b69-11b243fcb428.mp3"
    }

];


let currentTrack = 0;
let shuffle = true;


/* =========================
   LOAD TRACK
========================= */

function loadTrack(index, autoplay = false) {

    currentTrack =
        (index + tracks.length) % tracks.length;

    audio.src =
        tracks[currentTrack].url;

    audio.volume =
        Number(volume.value) / 100;


    if (autoplay) {

        audio.play()
            .then(() => {

                playIcon.className =
                    "fa-solid fa-pause";

            })
            .catch(() => {});

    }

}


/* =========================
   NEXT TRACK
========================= */

function nextTrack() {

    let next;

    if (shuffle && tracks.length > 1) {

        do {

            next =
                Math.floor(
                    Math.random() * tracks.length
                );

        } while (
            next === currentTrack
        );

    } else {

        next =
            currentTrack + 1;

    }


    loadTrack(next, true);

}


/* =========================
   ENTER
========================= */

function enterSite() {

    enterScreen.classList.add("hidden");


    backgroundVideo.muted = false;

    backgroundVideo
        .play()
        .catch(() => {});


    audio
        .play()
        .then(() => {

            playIcon.className =
                "fa-solid fa-pause";

        })
        .catch(() => {

            playIcon.className =
                "fa-solid fa-play";

        });

}


enterScreen.addEventListener(
    "click",
    enterSite,
    { once: true }
);


/* =========================
   PLAY / PAUSE
========================= */

playButton.addEventListener(
    "click",
    async () => {

        if (audio.paused) {

            try {

                await audio.play();

                playIcon.className =
                    "fa-solid fa-pause";

            } catch (error) {

                console.log(
                    "Nie można odtworzyć muzyki."
                );

            }

        } else {

            audio.pause();

            playIcon.className =
                "fa-solid fa-play";

        }

    }
);


/* =========================
   NEXT
========================= */

nextButton.addEventListener(
    "click",
    nextTrack
);


/* =========================
   AUTO NEXT
========================= */

audio.addEventListener(
    "ended",
    nextTrack
);


/* =========================
   VOLUME
========================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(volume.value) / 100;

    }
);


/* =========================
   START
========================= */

loadTrack(0);
