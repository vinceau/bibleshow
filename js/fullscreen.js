// Find the right method, call on correct element
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Whack fullscreen
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function currentlyFullscreen() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
}

function toggleFullscreen() {
    if (currentlyFullscreen()) {
        exitFullscreen();
    } else {
        enterFullscreen(document.body);
    }
}
