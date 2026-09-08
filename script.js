const audio = document.getElementById("audio");
const volume = document.getElementById("volume");
const enterScreen = document.getElementById("enter-screen");
const backgroundVideo = document.getElementById("background-video");

const tracks = [
"https://r2.guns.lol/7f21016c-c349-4ed3-9658-485ebacbff43.mp3",
"https://r2.guns.lol/5cc27252-4b7d-4941-8b69-11b243fcb428.mp3"
];

let currentTrack = -1;

/* =========================
RANDOM TRACK
========================= */

function loadRandomTrack() {
let newTrack;

```
do {
    newTrack = Math.floor(Math.random() * tracks.length);
} while (tracks.length > 1 && newTrack === currentTrack);

currentTrack = newTrack;

audio.src = tracks[currentTrack];
audio.volume = Number(volume.value);

audio.load();
```

}

/* =========================
ENTER
========================= */

enterScreen.addEventListener("click", async () => {

```
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
```

});

/* =========================
VOLUME
========================= */

volume.addEventListener("input", () => {
audio.volume = Number(volume.value);
});

/* =========================
DISCORD COPY
========================= */

document.querySelectorAll("[data-copy]").forEach(button => {

```
button.addEventListener("click", async () => {

    const text = button.dataset.copy;

    try {
        await navigator.clipboard.writeText(text);

        const original = button.innerHTML;

        button.innerHTML =
            '<i class="fa-solid fa-check"></i>';

        setTimeout(() => {
            button.innerHTML = original;
        }, 1200);

    } catch (error) {
        console.log("Copy failed:", error);
    }
});
```

});

/* =========================
PRELOAD RANDOM TRACK
========================= */

window.addEventListener("load", () => {
loadRandomTrack();
});
