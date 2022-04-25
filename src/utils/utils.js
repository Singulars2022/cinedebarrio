export function sanitizeInput(){

}
export function cleanLetter(letter) {
    letter = letter.replace(/á/gi, "a");
    letter = letter.replace(/é/gi, "e");
    letter = letter.replace(/í/gi, "i");
    letter = letter.replace(/ó/gi, "o");
    letter = letter.replace(/ú/gi, "u");
    letter = letter.replace(/ü/gi, "u");
    letter = letter.replace(/ö/gi, "o");
    return letter;
  }
  export function isSpecial(letter) {
    var specialChars = "¡!@#$^&%*()+=-[]/{}|:<>¿?,.'";
    let patern = /^[0-9]+$/;
    //console.log(specialChars.includes(letter))
    if (specialChars.includes(letter) || letter.match(patern)) {
      return true;
    } else {
      return false;
    }
  }

// import { sanitizeInput } utils from '@/utils/utils.js'
// sanitizeInput();