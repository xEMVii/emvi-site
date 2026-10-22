const audio = document.getElementById("audio");
const volume = document.getElementById("volume");
const enterScreen = document.getElementById("enter-screen");
const backgroundVideo = document.getElementById("background-video");

const tracks = [
    "music/redflag.mp3",
    "music/style.mp3",
    "music/intoyou.mp3",
    "music/ness1.mp3",
    "music/foxboy.mp3"
];

let currentTrack = null;

/* =========================
   RANDOM MUSIC
========================= */

function getRandomTrack() {
    return Math.floor(Math.random() * tracks.length);
}

function loadRandomTrack() {
    currentTrack = getRandomTrack();

    audio.src = tracks[currentTrack];
    audio.volume = Number(volume.value);
    audio.load();
}

/* =========================
   ENTER
========================= */

enterScreen.addEventListener("click", async () => {

    enterScreen.classList.add("hidden");

    backgroundVideo.muted = false;

    try {
        await backgroundVideo.play();
    } catch (error) {
        console.log("Background video playback blocked:", error);
    }

    loadRandomTrack();

    try {
        await audio.play();
    } catch (error) {
        console.log("Audio playback blocked:", error);
    }
});

/* =========================
   VOLUME
========================= */

volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
});

/* =========================
   SOCIAL COPY
========================= */

document.querySelectorAll("[data-copy]").forEach(button => {

    button.addEventListener("click", async () => {

        const text = button.dataset.copy;

        try {
            await navigator.clipboard.writeText(text);

            const original = button.innerHTML;

            button.innerHTML = '<i class="fa-solid fa-check"></i>';

            setTimeout(() => {
                button.innerHTML = original;
            }, 1200);

        } catch (error) {
            console.log("Copy failed:", error);
        }
    });

});

/* =========================
   RANDOM TRACK ON RELOAD
========================= */

window.addEventListener("load", () => {
    loadRandomTrack();
});

const titles = [
    "E",
    "EM",
    "EMV",
    "EMVi",
    "EMV",
    "EM",
    "E",
    "\u200B"
];

let titleIndex = 0;

setInterval(() => {
    document.title = titles[titleIndex];
    titleIndex++;

    if (titleIndex >= titles.length) {
        titleIndex = 0;
    }
}, 400);
