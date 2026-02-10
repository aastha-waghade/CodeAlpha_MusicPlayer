const songs = [
  { title: "Cheap Thrills", artist: "Sia", src: "songs/music1.mp3", cover: "images/music1.jpg" },
  { title: "Sugar & Brownies", artist: "DHARIA", src: "songs/music2.mp3", cover: "images/music2.jpg" },
  { title: "Despacito", artist: "Luis Fonsi", src: "songs/music3.mp3", cover: "images/music3.jpg" },
  { title: "Gata Only", artist: "FloyyMenor", src: "songs/music4.mp3", cover: "images/music4.jpg" },
  { title: "Lean On", artist: "DJ Snake", src: "songs/music5.mp3", cover: "images/music5.jpg" }
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
const playlistToggle = document.getElementById("playlistToggle");
const playlistSection = document.getElementById("playlistSection");
const playlist = document.getElementById("playlist");

let index = 0;

/* Load Song */
function loadSong(i) {
  audio.src = songs[i].src;
  albumImage.src = songs[i].cover;
  songTitle.textContent = songs[i].title;
  songArtist.textContent = songs[i].artist;
  updateActive();
}

/* Play / Pause */
playBtn.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
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

/* Next / Prev */
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

/* Auto Next on Song End */
audio.addEventListener("ended", () => {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
});

/* Progress */
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

/* Volume */
volumeSlider.oninput = () => {
  audio.volume = volumeSlider.value / 100;
};

/* Playlist Toggle */
playlistToggle.addEventListener("click", () => {
  console.log("Playlist clicked");
  playlistSection.classList.toggle("show");
});

/* Render Playlist */
function renderPlaylist() {
  playlist.innerHTML = "";
  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "playlist-item";
    if (i === index) div.classList.add("active");

    div.innerHTML = `
      <img src="${song.cover}">
      <div>
        <p>${song.title}</p>
        <small>${song.artist}</small>
      </div>
    `;

    div.onclick = () => {
      index = i;
      loadSong(index);
      audio.play();
    };

    playlist.appendChild(div);
  });
}

function updateActive() {
  document.querySelectorAll(".playlist-item").forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

/* Time Format */
function format(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* Init */
loadSong(index);
renderPlaylist();
updateActive();