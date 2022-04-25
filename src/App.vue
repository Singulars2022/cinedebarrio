<script setup>
import PanelLetters from "./components/PanelLetters.vue";
import keyboard from "./components/VirtualKeyboard.vue";
import helpIcon from "./assets/icons/help_white_48dp.svg";

import Slider from "./components/PanelSlider.vue";
import Options from "./components/HeaderOptions.vue";
import KeyboardEvents from "./components/Keyboard-events.vue";
import Modal from "./components/UX/ModalUXComponent.vue";
import Loser from "./components/pages/LoserPage.vue";
import Winer from "./components/pages/WinerPage.vue";

//Funciones from utils

import {cleanLetter}  from '@/utils/utils.js'
import {isSpecial}  from '@/utils/utils.js'
import {reloadPage}  from '@/utils/utils.js'
</script>

<script>
export default {
  data() {
    return {
      uid: 0,
      guessedLetters: [],
      currentMovie: [],
      gameElements: { images: [], title: "" },
      keyboardLetter: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
        ["z", "x", "c", "v", "b", "n", "m"],
      ],
      // Variables del modal
      currentModal: "",
      isModalVisible: false,

      // Variables del slider
      displayedImages: [],

      // Vriables de jugabilidad
      chances: 5,
      gameStatus: 0,
      darkTheme: true,
    };
  },
  async created() {
    // Peticion Fetch a TMDB
    await this.getData();

    // Ponemos la primera imagen
    const firstImage = this.gameElements.images.pop();
    this.displayedImages.push(firstImage);

    // Creación del teclado
    this.keyboardLetter = this.keyboardLetter.map((arrayRow) => {
      return arrayRow.map((l) => {
        return {
          id: this.uid++,
          letter: l,
          status: "default",
        };
      });
    });
  },
  computed: {
    lettersControl() {
      return this.keyboardLetter;
    },
    movieTitle() {
      return this.gameElements.title.toLowerCase();
    }
  },
  mounted() {
    dragElement(document.getElementById("keyboard"));

    function dragElement(elmnt) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown =
          dragMouseDown;
      } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
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
  },
  methods: {
    // Obtiene los datos de la aplicación
    async getData() {
      let results = await fetch(
        `https://api.themoviedb.org/3/list/8199288?api_key=42f1941bec5c4006006323f020c28fa5&language=es-ES`
      );
      let json = await results.json();
      // Peticion de peliculas a la api
      this.currentMovie = json.items[Math.floor(Math.random() * json.items.length - 1)];

      // Obtenemos el titulo de la api
      this.gameElements.title = this.currentMovie.title;

      // Creamos un array de imagenes con la portada y un frame de la pelicula
      const path_to_images = "https://image.tmdb.org/t/p/original";

      // Si existe la portada o la contraportada la metemos en el array.
      if (
        this.currentMovie.backdrop_path != null &&
        this.currentMovie.backdrop_path != undefined
      ) {
        this.gameElements.images.push(
          path_to_images + this.currentMovie.backdrop_path
        );
      }
      if (
        this.currentMovie.poster_path != null &&
        this.currentMovie.poster_path != undefined
      ) {
        this.gameElements.images.push(
          path_to_images + this.currentMovie.poster_path
        );
      }
    },
    // Mega funcion, 1. Comprueba y pulsa la tecla del teclado virtual, 2. Resta intentos,3. Comprueba si has perdido, 5. Llama a la función para comprobar si has perdido
    processLetter(letter) {
      if (this.gameStatus != 0) {
        return;
      }
      letter = letter.toLowerCase();

      let normalizedMovie = this.movieTitle;
      console.log("movie:", normalizedMovie);

      const removeAccents = (str) => {
        return str.normalize().replace(/[\u0300-\u036f]/g, "");
      };

      normalizedMovie = removeAccents(normalizedMovie);

      console.log("movie:", normalizedMovie);

      const clickedLetter = []
        .concat(...this.keyboardLetter)
        .find((l) => l.letter == letter);

      // TODO: Refactorizar, hacer un return
      if (!this.guessedLetters.includes(letter)) {
        if (normalizedMovie.includes(letter)) {
          clickedLetter.status = "correct";
        } else {
          clickedLetter.status = "wrong";

          // Reducimos el contador de vidas
          this.chances--;
          if (this.chances <= 0) {
            this.gameStatus = 1; // 1 significa has perdido
            this.openModal(Loser);
          }

          // Mientras queden imágenes que mostrar, sacar la siguiente
          if (this.gameElements.images.length > 0) {
            this.displayedImages.push(this.gameElements.images.pop());
          } else {
            return;
          }
        }
        this.guessedLetters.push(letter);
      }

      // Comprobamos si hemos ganado.
      this.checkVictory(normalizedMovie);
    },
    // Función que comprueba si has ganado
    checkVictory(normalizedMovie) {
      // Hacemos una comprobación de si hemos ganado
      cleanLetter(normalizedMovie);

      let contError = 0;
      console.log("Pelicula Normalizada: ", normalizedMovie);
      normalizedMovie.split("").forEach((element) => {
        if (
          !this.guessedLetters.includes(element) &&
          element != " " &&
          !this.isSpecial(element)
        ) {
          contError++;
        }
      });

      if (contError == 0) {
        this.gameStatus = 2;
        this.openModal(Winer);
      }
    },
    letterPressed(e) {
      if ((e.keyCode < 65 || e.keyCode > 90) && e.keyCode != 192) {
        return;
      }
      let keyPressed = e.key;
      this.processLetter(keyPressed);
    },
    // Modal, abrir y cerrar
    closeModal() {
      this.isModalVisible = false;
      this.currentModal = undefined;
    },
    openModal(modal) {
      this.isModalVisible = true;
      this.currentModal = modal;
    },
    onChangeTheme(isDarkTheme) {
      this.darkTheme = isDarkTheme;
    }
  },
};
</script>

<template>
  <Options />
  <modal
    :is-modal-visible="isModalVisible"
    @close-modal="closeModal"
  >
    <component
      :is="currentModal"
      class="modal"
    />
  </modal>
  <main>
    <KeyboardEvents
      v-if="gameStatus == 0"
      @keyup="letterPressed"
    />
    <div
      class="slider-movie"
      :style="gameStatus != 0 ? { height: '800px' } : ''"
    >
      <!--<SliderMovie>-->
      <img
        class="logo"
        src="/img/logo-b-cinedebarrio-white.png"
        alt="logo"
      >
      <Slider :array-images-movies="displayedImages" />
    </div>
    <button
      @click="reloadPage"
      class="reset-btn"
      v-if="gameStatus != 0"
    >
      Volver a jugar
    </button>
    <panel-letters
      :title-text="movieTitle"
      :guessed-letters="guessedLetters"
    />
    <keyboard
      id="keyboard"
      v-if="gameStatus == 0"
      :chances="chances"
      :letters="keyboardLetter"
      @clicked-letter="(id) => processLetter(id)"
    />
  </main>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
@import "./assets/base.css";
@import "./assets/style.css";

#game {
  background: radial-gradient(ellipse, #303030 0%, #161312 100%);
}

#game.light {
  background: radial-gradient(ellipse, #dfdfdf 0%, #7b7b7b 100%);

}

main #app {
  max-width: 100vw;
  max-height: 100vh;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  width: 80px;
  position: absolute;
  z-index: 999;
  left: 7vw;
  top: -25px;
}

.slider-movie {
  position: relative;
  display: flex;
  justify-content: center;
  width: auto;
  height: 400px;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

.reset-btn {
  background: black;
  color: white;
  border-radius: 1em;
  padding: 1em;
  font-size: 1em;
  border: 0px transparent;
  cursor: pointer;
  margin-top: 1em;
  width: 50%;
  margin: 0 auto;
  display: block;
  margin-top: 1em;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    flex-direction: column;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

#keyboard {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>
