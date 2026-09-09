const audio = document.getElementById("audio");
const volume = document.getElementById("volume");
const enterScreen = document.getElementById("enter-screen");
const backgroundVideo = document.getElementById("background-video");

const tracks = [
    "https://r2.guns.lol/7f21016c-c349-4ed3-9658-485ebacbff43.mp3",
    "https://r2.guns.lol/5cc27252-4b7d-4941-8b69-11b243fcb428.mp3",
    "https://r2.guns.lol/e4ee006a-6c7a-449a-b537-90b69a0a2917.mp3"
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
