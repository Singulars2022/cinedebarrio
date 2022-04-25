<script setup>
import PanelLetters from "./components/PanelLetters.vue";
import keyboard from "./components/Keyboard.vue";
import helpIcon from "./assets/icons/help_white_48dp.svg";

import Slider from "./components/Slider.vue";
import Options from "./components/Options.vue";
import KeyboardEvents from "./components/Keyboard-events.vue";
import Modal from "./components/UX/ModalUXComponent.vue";
import Loser from "./components/pages/Loser.vue";
import Winer from "./components/pages/Winer.vue";
</script>

<script>


export default {
  data() {
    return {
   
      uid: 0,
      guessedLetters: [],
      actualMovie: [],
      Panelmovie: { images: [], title: "" },
      letterArray: [
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
      tryNumber: 5,
      gameStatus: 0,
      darkTheme: true,
    };
  },
  async created() {
    // Peticion Fetch a TMDB
    await this.getData();

    // Ponemos la primera imagen
    const firstImage = this.Panelmovie.images.pop();
    this.displayedImages.push(firstImage);

    // Creación del teclado
    this.letterArray = this.letterArray.map((arrayRow) => {
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
      return this.letterArray;
    },
    movieTitle() {
      return this.Panelmovie.title.toLowerCase();
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
      this.actualMovie = json.items[Math.floor(Math.random() * json.items.length - 1)];

      // Obtenemos el titulo de la api
      this.Panelmovie.title = this.actualMovie.title;

      // Creamos un array de imagenes con la portada y un frame de la pelicula
      const path_to_images = "https://image.tmdb.org/t/p/original";

      // Si existe la portada o la contraportada la metemos en el array.
      if (
        this.actualMovie.backdrop_path != null &&
        this.actualMovie.backdrop_path != undefined
      ) {
        this.Panelmovie.images.push(
          path_to_images + this.actualMovie.backdrop_path
        );
      }
      if (
        this.actualMovie.poster_path != null &&
        this.actualMovie.poster_path != undefined
      ) {
        this.Panelmovie.images.push(
          path_to_images + this.actualMovie.poster_path
        );
      }
    },
    // Mega funcion, 1. Comprueba y pulsa la tecla del teclado virtual, 2. Resta intentos,3. Comprueba si has perdido, 5. Llama a la función para comprobar si has perdido
    letterClicked(letter) {
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
        .concat(...this.letterArray)
        .find((l) => l.letter == letter);

      // TODO: Refactorizar, hacer un return
      if (!this.guessedLetters.includes(letter)) {
        if (normalizedMovie.includes(letter)) {
          clickedLetter.status = "correct";
        } else {
          clickedLetter.status = "wrong";

          // Reducimos el contador de vidas
          this.tryNumber--;
          if (this.tryNumber <= 0) {
            this.gameStatus = 1; // 1 significa has perdido
            this.openModal(Loser);
          }

          // Mientras queden imágenes que mostrar, sacar la siguiente
          if (this.Panelmovie.images.length > 0) {
            this.displayedImages.push(this.Panelmovie.images.pop());
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
      normalizedMovie = normalizedMovie.replace(/á/gi, "a");
      normalizedMovie = normalizedMovie.replace(/é/gi, "e");
      normalizedMovie = normalizedMovie.replace(/í/gi, "i");
      normalizedMovie = normalizedMovie.replace(/ó/gi, "o");
      normalizedMovie = normalizedMovie.replace(/ú/gi, "u");
      normalizedMovie = normalizedMovie.replace(/ü/gi, "u");
      normalizedMovie = normalizedMovie.replace(/ö/gi, "o");
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
    isSpecial(letter) {
      // Comprobamos si un elemento es especial
      var specialChars = "¡!@#$^&%*()+=-[]/{}|:<>¿?,.'";
      let patern = /^[0-9]+$/;
      if (specialChars.includes(letter) || letter.match(patern)) {
        return true;
      } else {
        return false;
      }
    },
    letterPressed(e) {
      if ((e.keyCode < 65 || e.keyCode > 90) && e.keyCode != 192) {
        return;
      }
      let keyPressed = e.key;
      this.letterClicked(keyPressed);
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
    // Recargar la pagina
    reloadPage() {
      window.location.reload();
    },
    onChangeTheme(isDarkTheme) {
      this.darkTheme = isDarkTheme;
    }
  },
};
  
  
</script>

<template >
  <Options />
  <modal :isModalVisible="isModalVisible" @close="closeModal">
    <component :is="currentModal" class="modal"></component>
  </modal>
  <main>
    <KeyboardEvents v-if="gameStatus == 0" @keyup="letterPressed"></KeyboardEvents>
    <div class="slider-movie" :style="gameStatus != 0 ? { height: '800px' } : ''">
      <!--<SliderMovie>-->
      <img class="logo" src="/img/logo-b-cinedebarrio-white.png" alt="logo" />
      <Slider :ArrayMovies="displayedImages" />
    </div>
    <button @click="reloadPage" class="reset-btn" v-if="gameStatus != 0">
      Volver a jugar
    </button>
    <panel-letters :text="movieTitle" :guessedLetters="guessedLetters" />
    <keyboard id="keyboard" v-if="gameStatus == 0" :popcornNumber="tryNumber" :letters="letterArray"
      @clickedLetter="(id) => letterClicked(id)" />
  </main>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
@import "./assets/base.css";
@import "./assets/style.css";


::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: #D62929;
	background-image: -webkit-linear-gradient(90deg,
											  transparent,
											  rgba(0, 0, 0, 0.4) 50%,
											  transparent,
											  transparent)
}
::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 10px;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px     rgba(0,0,0,0.5); 
}



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
