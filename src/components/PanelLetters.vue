

<script>
export default {
  props: ["text", "guessedLetters"],
  computed: {
    title() {
      return this.text.split(" ");
    },
  },
  methods: {
    // Limpiamos la letra de acentos y dieresis.
    cleanLetter(letter) {
      // Quitamos acentos
      letter = letter.replace(/á/gi, "a");
      letter = letter.replace(/é/gi, "e");
      letter = letter.replace(/í/gi, "i");
      letter = letter.replace(/ó/gi, "o");
      letter = letter.replace(/ú/gi, "u");
      // Quitamos Dieresis
      letter = letter.replace(/ä/gi, "a");
      letter = letter.replace(/ë/gi, "e");
      letter = letter.replace(/ï/gi, "i");
      letter = letter.replace(/ö/gi, "o");      
      letter = letter.replace(/ü/gi, "u");      
      return letter;
    },
    // Comprobamos si el caracter actual es o no un simbolo o un numero.
    isSpecial(letter) {
      var specialChars = "¡!@#$^&%*()+=-[]/{}|:<>?¿,.";
      let patern = /^[0-9]+$/;      
      if (specialChars.includes(letter) || letter.match(patern)) {
        return true; // Si el caracter es un numero o un simbolo devuelve true
      } else {
        return false; // Si el caracter es una letra devuelve false.
      }
    },
  },
};
</script>

<template>
  <div class="quest--panel">    
    <!-- Bucle de palabras -->
    <span class="word--panel" v-for="(word, index) in title" :key="index">
      <!-- Bucle de letras -->
      <span
        class="letter--panel"
        :class="{ empty: letter === ' ' }"
        v-for="(letter, index) in word"
        :key="index"
      >
        <TransitionGroup name="slide-fade">
          <!-- Letra con letra -->
          <span
            class="letter"
            :class="
              guessedLetters.includes(cleanLetter(letter)) || isSpecial(letter)
                ? 'animation'
                : ''
            "
            v-if="
              guessedLetters.includes(cleanLetter(letter)) || isSpecial(letter)
            "
          >
            {{ letter }}</span
          >
          <!-- Letra sin letra o espacio -->
          <span
            class="letter"
            v-if="
              !guessedLetters.includes(cleanLetter(letter)) &&
              !isSpecial(letter)
            "
          ></span>
        </TransitionGroup>
      </span>
    </span>
  </div>
</template>

<style scoped>
.empty {
  background-color: transparent;
  border: none;
}

.quest--panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.word--panel {
  display: flex;
  text-transform: uppercase;
  flex-wrap: nowrap;
  margin-left: 72px;
  margin-right: 72px;
  justify-content: center;
  align-items: center;
}

.letter {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 3rem;
  border: black solid 1px;
  background-color: white;
  width: 80px;
  height: 80px;
  text-align: center;
  font-weight: 700;
  transition: 1s all;
  position: absolute;
  user-select: none;
  color: black;
}

.letter--panel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-image: url("../../public/panel-1letters.png");
  background-size: 100%;
  width: 145px;
  height: 171px;
  margin: -4px;
}

/*.animation {
  animation-name: animation;
  animation-duration: 1s;
    
}

@keyframes animation {
  from { transform: rotateY(-90deg);}
  to { transform: rotateY(0deg);}
}*/

/* Animacion */
.slide-fade-enter-active {
  transition: all 1s;
}

.slide-fade-leave-active {
  transition: all 0.5s;
}

.slide-fade-enter-from {
  opacity: 1;
  transform: rotateY(-90deg);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: rotateY(0deg);
}
</style>