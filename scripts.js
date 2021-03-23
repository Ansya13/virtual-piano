const piano = document.querySelector(".piano");
const keys = piano.querySelectorAll(".piano-key");

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play(src);
}

// Mouse events
let mouse = false;

piano.addEventListener("mousedown", function () {
  mouse = true;
});
document.addEventListener("mouseup", function () {
  mouse = false;
});

keys.forEach(function (key) {
  const note = key.dataset.note;
  const src = `assets/audio/${note}.mp3`;

  key.addEventListener("mousedown", function (event) {
    event.target.classList.add("piano-key-active", "piano-key-active-second");
    playAudio(src);
  });

  key.addEventListener("mouseup", function (event) {
    event.target.classList.remove(
      "piano-key-active",
      "piano-key-active-second"
    );
  });

  key.addEventListener("mouseenter", function (event) {
    if (mouse === true) {
      event.target.classList.add("piano-key-active", "piano-key-active-second");
      playAudio(src);
    }
  });

  key.addEventListener("mouseleave", function () {
    key.classList.remove("piano-key-active", "piano-key-active-second");
    key.classList.add("piano-key-remove-mouse");
  });
});

// Keydown event

window.addEventListener("keydown", function (e) {
  if (e.repeat === false) {
    const letter = e.code.slice(-1);
    keys.forEach(function (key) {
      if (key.dataset.letter === letter) {
        key.classList.add("piano-key-active");
        playAudio(`assets/audio/${key.dataset.note}.mp3`);
      }
    });
  }
});

window.addEventListener("keyup", function () {
  keys.forEach((key) => key.classList.remove("piano-key-active"));
});

// Change BTN Signature

const notesBut = document.querySelector(".btn-notes");
const lettersBut = document.querySelector(".btn-letters");

lettersBut.addEventListener("click", function () {
  keys.forEach((key) => key.classList.add("letter"));
  lettersBut.classList.add("btn-active");
  notesBut.classList.remove("btn-active");
});

notesBut.addEventListener("click", function () {
  keys.forEach((key) => key.classList.remove("letter"));
  notesBut.classList.add("btn-active");
  lettersBut.classList.remove("btn-active");
});

// fullscreen

const fullscreen = document.querySelector(".fullscreen");

fullscreen.addEventListener("click", function toggleFullScreen() {
	if (!document.fullscreenElement) {
	  document.body.webkitRequestFullscreen();
	//   document.body.requestFullscreen();

	} else {
	document.webkitExitFullscreen();
    // document.exitFullscreen();

  }
});