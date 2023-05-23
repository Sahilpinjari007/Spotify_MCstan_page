let progressBar = document.querySelectorAll('#song-progress')[0];
let pouse_btn = document.getElementsByClassName('song-play-push')[0];
let big_button = document.getElementsByClassName('big-push-btn')[0];
let mediaPlayer = new Audio('MC-Songs/Ek Din Pyaar.mp3');
let songItems = Array.from(document.getElementsByClassName("songs"));
var cur = document.querySelector('.time-count'),
dur = document.querySelector('.song-time');
let songIndex = 0;
let oldClickIndex = -1;


let songs = [
  { songName: "Ek Din Pyaar", path: "MC-Songs/Ek Din Pyaar.mp3", coverImg: "assets/asset 2.jpeg" },
  { songName: "Basti Ka Hast", path: "MC-Songs/Basti Ka Hasti.mp3", coverImg: "assets/asset 3.jpeg" },
  { songName: "Shana Bann", path: "MC-Songs/Shana Bann.mp3", coverImg: "assets/asset 4.jpeg" },
  { songName: "Snake", path: "MC-Songs/Snake.mp3", coverImg: "assets/asset 5.jpeg" },
  { songName: "Bitch", path: "MC-Songs/Bitch.mp3", coverImg: "assets/asset 3.jpeg" },

]

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverImg;
})

songItems.forEach((element, i) => {

  element.addEventListener('click', () => {


    if (oldClickIndex == i) {
      mediaPlayer.pause();
      mediaPlayer = new Audio(songs[i].path);
      mediaPlayer.play();
      updateButtons();
      oldClickIndex = -1;
      songIndex = i;

      document.getElementById('song-img').src = songs[i].coverImg;
      document.getElementById("song-name").innerHTML = songs[i].songName;
      songItems[i].style.backgroundColor = "#343435";;

      songItems.forEach((element, i) => {
        element.getElementsByClassName('song-info')[0].style.color = "white";
        element.style.color = "white";
        const el = document.getElementById('song1');

        if (i == songIndex) {
          element.style.color = "#1ed760";
          element.getElementsByClassName('song-info')[0].style.color = "#1ed760";
        }
      })

    }
    else {
      oldClickIndex = i;
    }
  })
})
let clicks = (numb) =>{

  songItems.forEach((element, i) =>{
    element.style.backgroundColor = "transparent";
  })

  songItems[numb].style.backgroundColor = "#636363";
}


document.getElementById('song-back').addEventListener('click', () => {

  if (songIndex <= 0) {
    songIndex = 5;
  }

  mediaPlayer.pause();
  mediaPlayer = new Audio(songs[songIndex - 1].path);
  mediaPlayer.play();

  document.getElementById('song-img').src = songs[songIndex - 1].coverImg;
  document.getElementById("song-name").innerHTML = songs[songIndex - 1].songName;

  songIndex = songIndex - 1;
  updateButtons();
  updateSeekBar();
})

document.getElementById('btn-next').addEventListener('click', () => {

  if (songIndex == 4) {
    songIndex = -1;
  }

  mediaPlayer.pause();
  mediaPlayer = new Audio(songs[songIndex + 1].path);
  mediaPlayer.play();

  document.getElementById('song-img').src = songs[songIndex + 1].coverImg;
  document.getElementById("song-name").innerHTML = songs[songIndex + 1].songName;

  songIndex = songIndex + 1;
  updateButtons();
  updateSeekBar();
})




pouse_btn.addEventListener('click', () => {
  updateButtons();
})

big_button.addEventListener("click", () => {
  updateButtons();
})

let updateButtons = () => {
  if (mediaPlayer.paused || mediaPlayer.currentTime <= 0) {

    mediaPlayer.play();
    document.getElementsByClassName('btn-pause')[0].style.display = "none";
    document.getElementsByClassName('btn-play')[0].style.display = "block";

    document.getElementsByClassName('btn-pause')[1].style.display = "none";
    document.getElementsByClassName('btn-play')[1].style.display = "block";
  }
  else {
    mediaPlayer.pause();
    document.getElementsByClassName('btn-pause')[0].style.display = "block";
    document.getElementsByClassName('btn-play')[0].style.display = "none";

    document.getElementsByClassName('btn-pause')[1].style.display = "block";
    document.getElementsByClassName('btn-play')[1].style.display = "none";
  }

  songItems.forEach((element, i) => {
    element.getElementsByClassName('song-info')[0].style.color = "white";
    element.style.color = "white";
    const el = document.getElementById('song1');

    if (i == songIndex) {
      element.style.color = "#1ed760";
      element.getElementsByClassName('song-info')[0].style.color = "#1ed760";
    }
  })

  updateSeekBar();
}

// Listen to events
function updateSeekBar() {
  mediaPlayer.addEventListener('timeupdate', () => {

    progress = parseInt((mediaPlayer.currentTime / mediaPlayer.duration) * 100);
    console.log(progress);

    progressBar.style.backgroundSize = progress + '% 100%';
    progressBar.value = progress;

    mediaPlayer.addEventListener('timeupdate', function(e) {
      cur.textContent = sToTime(e.target.currentTime);
      dur.textContent = sToTime(e.target.duration);
    })
    
    function sToTime(t) {
      return padZero(parseInt((t / (60)) % 60)) + ":" + 
             padZero(parseInt((t) % 60));
    }
    function padZero(v) {
      return (v < 10) ? "0" + v : v;
    }

  })
}

document.querySelector('.main-section').addEventListener('wheel', function(event){

  if(event.deltaY<0){
      document.querySelector('.top-profile-subscription-nav').style.backgroundColor = "transparent"
  }
  else if(event.deltaY>0){
      document.querySelector('.top-profile-subscription-nav').style.backgroundColor = "#404043"
    console.log("isscrolling down");
  }
})



// if(scrooling() == "isScrolling"){
//   document.querySelector('.top-profile-subscription-nav').style.backgroundColor = "#404043"
//   console.log("isScrolling");
// }

function scrooling() {
  return "isScrolling";
}

