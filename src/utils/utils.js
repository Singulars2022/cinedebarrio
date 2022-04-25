export function sanitizeInput(){

}
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
export function  reloadPage() {
    window.location.reload();
  }
