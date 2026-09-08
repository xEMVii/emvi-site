const audio = document.getElementById("audio");
const enterScreen = document.getElementById("enter-screen");
const playButton = document.getElementById("play-btn");
const nextButton = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const trackName = document.getElementById("track-name");
const volume = document.getElementById("volume");
const backgroundVideo = document.getElementById("background-video");

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
   ŁADOWANIE UTWORU
========================= */

function loadTrack(index, autoplay = false) {

    currentTrack =
        (index + tracks.length) % tracks.length;

    const track = tracks[currentTrack];

    audio.src = track.url;

    trackName.textContent = track.name;

    audio.volume =
        Number(volume.value) / 100;

    progressBar.style.width = "0%";

    if (autoplay) {

        audio.play()
            .then(() => {
                playButton.textContent = "Ⅱ";
            })
            .catch(() => {
                playButton.textContent = "▶";
            });

    }
}


/* =========================
   NASTĘPNY UTWÓR
========================= */

function nextTrack() {

    let next;

    if (shuffle && tracks.length > 1) {

        do {
            next =
                Math.floor(
                    Math.random() * tracks.length
                );
        }
        while (next === currentTrack);

    } else {

        next = currentTrack + 1;

    }

    loadTrack(next, true);
}


/* =========================
   CLICK TO ENTER
========================= */

function enterSite() {

    enterScreen.classList.add("hidden");

    /*
     * Odblokowanie odtwarzania
     * po kliknięciu użytkownika.
     */

    backgroundVideo.muted = false;

    backgroundVideo
        .play()
        .catch(() => {});


    audio
        .play()
        .then(() => {

            playButton.textContent = "Ⅱ";

        })
        .catch(() => {

            playButton.textContent = "▶";

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

                playButton.textContent = "Ⅱ";

            } catch (error) {

                console.log(
                    "Nie udało się uruchomić muzyki."
                );

            }

        } else {

            audio.pause();

            playButton.textContent = "▶";
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
   AUTOMATYCZNA ZMIANA
========================= */

audio.addEventListener(
    "ended",
    nextTrack
);


/* =========================
   PASEK POSTĘPU
========================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const percentage =
            (audio.currentTime /
            audio.duration) * 100;

        progressBar.style.width =
            percentage + "%";
    }
);


/* =========================
   GŁOŚNOŚĆ
========================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(volume.value) / 100;

    }
);


/* =========================
   DISCORD
========================= */

const discordButton =
    document.querySelector(
        '.social[data-copy="emvi."]'
    );

if (discordButton) {

    discordButton.addEventListener(
        "click",
        async (event) => {

            event.preventDefault();

            try {

                await navigator.clipboard
                    .writeText("emvi.");

                const originalText =
                    discordButton.textContent;

                discordButton.textContent =
                    "Copied!";

                setTimeout(() => {

                    discordButton.textContent =
                        originalText;

                }, 1000);

            } catch (error) {

                console.log(
                    "Nie udało się skopiować Discorda."
                );

            }

        }
    );
}


/* =========================
   START
========================= */

loadTrack(0);
