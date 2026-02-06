const songs = [
    { title: "Music One", artist: "Artist One", src: "songs/music1.mp3", cover: "images/music1.jpg" },
    { title: "Music Two", artist: "Artist Two", src: "songs/music2.mp3", cover: "images/music2.jpg" },
    { title: "Music Three", artist: "Artist Three", src: "songs/music3.mp3", cover: "images/music3.jpg" },
    { title: "Music Four", artist: "Artist Four", src: "songs/music4.mp3", cover: "images/music4.jpg" },
    { title: "Music Five", artist: "Artist Five", src: "songs/music5.mp3", cover: "images/music5.jpg" }
];

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const timeline = document.getElementById("timeline");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeSlider = document.getElementById("volumeSlider");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const albumImage = document.getElementById("albumImage");
const albumArt = document.getElementById("albumArt");
const playlist = document.getElementById("playlist");
const playlistToggle = document.getElementById("playlistToggle");
const playlistSection = document.getElementById("playlistSection");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");

let index = 0;
let isPlaying = false;

function loadSong(i) {
    audio.src = songs[i].src;
    songTitle.textContent = songs[i].title;
    songArtist.textContent = songs[i].artist;
    albumImage.src = songs[i].cover;
    updateActive();
}

function playPause() {
    isPlaying ? audio.pause() : audio.play();
}

audio.onplay = () => {
    isPlaying = true;
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    albumArt.classList.add("playing");
};

audio.onpause = () => {
    isPlaying = false;
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    albumArt.classList.remove("playing");
};

prevBtn.onclick = () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
};

nextBtn.onclick = () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
};

audio.ontimeupdate = () => {
    progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    timeline.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = format(audio.currentTime);
    totalTime.textContent = format(audio.duration);
};

timeline.oninput = () => {
    audio.currentTime = (timeline.value / 100) * audio.duration;
};

volumeSlider.oninput = () => audio.volume = volumeSlider.value / 100;

playlistToggle.onclick = () => playlistSection.classList.toggle("show");

function format(t) {
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60);
    return ${m}:${s < 10 ? "0" : ""}${s};
}

function createPlaylist() {
    songs.forEach((song, i) => {
        let div = document.createElement("div");
        div.className = "playlist-item";
        div.innerHTML = <img src="${song.cover}"><div>${song.title}</div>;
        div.onclick = () => {
            index = i;
            loadSong(i);
            audio.play();
        };
        playlist.appendChild(div);
    });
}

function updateActive() {
    document.querySelectorAll(".playlist-item").forEach((el, i) => {
        el.classList.toggle("active", i === index);
    });
}

playBtn.onclick = playPause;
audio.onended = nextBtn.onclick;

loadSong(index);
createPlaylist();