export function cleanLetter(param) {
  param = param.replace(/á/gi, "a");
  param = param.replace(/é/gi, "e");
  param = param.replace(/í/gi, "i");
  param = param.replace(/ó/gi, "o");
  param = param.replace(/ú/gi, "u");
  param = param.replace(/ü/gi, "u");
  param = param.replace(/ö/gi, "o");
  return param;
}
export function isSpecial(letter) {
  var specialChars = "¡!@#$^&%*()+=-[]/{}|:<>¿?,.'";
  let patern = /^[0-9]+$/;

  if (specialChars.includes(letter) || letter.match(patern)) {
    return true;
  } else {
    return false;
  }
}
export function reloadPage() {
  window.location.reload();
}
export function toggleFullscreen(elem) {
  elem = elem || document.documentElement;

  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

export function dragElement(elmnt, arrows) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(arrows.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(arrows.id + "header").onmousedown =
      dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    arrows.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
