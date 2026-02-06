const songs = [
    { title: "Cheap Thrills", artist: "Sia", src: "songs/music1.mp3", cover: "images/music1.jpg" },
    { title: "Sugar & Brownies", artist: "DHARIA", src: "songs/music2.mp3", cover: "images/music2.jpg" },
    { title: "Despacito", artist: "Luis Fonsi & Justin Bieber & Purito Rican ", src: "songs/music3.mp3", cover: "images/music3.jpg" },
    { title: "Gata Only", artist: "FloyyMenor & Anitta & Ozuna", src: "songs/music4.mp3", cover: "images/music4.jpg" },
    { title: "Lean On", artist: "Dj Snake & Major Lazer", src: "songs/music5.mp3", cover: "images/music5.jpg" }
];

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const albumArt = document.getElementById("albumArt");
const albumImage = document.getElementById("albumImage");
const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const timeline = document.getElementById("timeline");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeSlider = document.getElementById("volumeSlider");

let index = 0;

function loadSong(i) {
  audio.src = songs[i].src;
  albumImage.src = songs[i].cover;
  songTitle.textContent = songs[i].title;
  songArtist.textContent = songs[i].artist;
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch(err => console.log(err));
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => {
  playIcon.classList.add("hidden");
  pauseIcon.classList.remove("hidden");
  albumArt.classList.add("playing");
});

audio.addEventListener("pause", () => {
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
  albumArt.classList.remove("playing");
});

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
  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percent + "%";
    timeline.value = percent;
    currentTime.textContent = format(audio.currentTime);
    totalTime.textContent = format(audio.duration);
  }
};

timeline.oninput = () => {
  audio.currentTime = (timeline.value / 100) * audio.duration;
};

volumeSlider.oninput = () => {
  audio.volume = volumeSlider.value / 100;
};

function format(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

loadSong(index);