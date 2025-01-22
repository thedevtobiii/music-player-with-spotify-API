const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration'); 
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music
const songs =[
  {
    name: 'music-1',
    displayName : 'Electric Chill Machine',
    artist: 'Xander',
    image : 'image-1'
  },
{
  name: 'music-2',
  displayName:'Seven Nation Army (Remix)',
  artist:'Xander',
  image : 'image-2'
},{
  name:'music-3',
  displayName:'Front Row (Remix)',
  artist:'Xander',  
  image:'image-3'
},{
  name:'metric-1',
  displayName:'Front Row (Remix)',
  artist:'Xander',
  image:'metric-1'
}
]

let isPlaying = false;

function playSong(){
  music.play();
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause')
  playBtn.setAttribute('title', 'pause');
}
function pauseSong(){
  music.pause();
  isPlaying = false;
  playBtn.classList.replace('fa-pause','fa-play'); 
  playBtn.setAttribute('title', 'play');
}

//play or pause
playBtn.addEventListener('click', ()=>(isPlaying ? pauseSong() : playSong()));

//play/pause functionality done

//next/prev functionality
function loadSong (song){
  title.textContent = song.displayName;
  artist.textContent= song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.image}.jpg`;   
}

//current song 
let songIndex = 0;

//prev song
function prevSong(){
  songIndex--;  
  if (songIndex <0){
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);  
  playSong();
}
 
//next song
function nextSong(){
  songIndex++;
  if (songIndex > songs.length -1){
songIndex = 0;  
  }
  loadSong(songs[songIndex]);  
  playSong();
}

//on startup
loadSong(songs[songIndex]); 
//updates progres bar and time
function updateProgressBar(e){
  if (isPlaying){
    const {duration, currentTime} = e.srcElement;
    //srcElement gotten from console logging the event
    //update progress bar width
    const progressPercent = (currentTime/duration)*100; 
    progress.style.width = `${progressPercent}%`;
    // calculate the display for the duration
    const durationMinutes = Math.floor(duration/60);
    let durationSeconds = Math.floor(duration%60);
    if (durationSeconds<10){
      durationSeconds = `0${durationSeconds}`;
    }
    
    // delay switching duration element to avoid nan
    if (durationSeconds){
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`; 
    }
     // calculate the display for the display for time
     const currentMinutes = Math.floor(currentTime/60);
     let currentSeconds = Math.floor(currentTime%60);
     if (currentSeconds<10){
       currentSeconds = `0${currentSeconds}`;
     }
currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}` 
  }
}

//set progress bar
function setProgressBar (e){
console.log(e);
const width = this.clientWidth;
const clickX = e.offsetX;
const {duration} = music;
//destructured constant
music.currentTime = (clickX/width)*duration;     
}

//event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);   
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener ('click', setProgressBar );