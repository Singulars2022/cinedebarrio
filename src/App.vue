<script setup>
import PanelLetters from "./components/PanelLetters.vue";
import keyboard from "./components/Keyboard.vue";
import helpIcon from "./assets/icons/help_white_48dp.svg";

import Slider from "./components/Slider.vue";
import Options from "./components/Options.vue";
import KeyboardEvents from "./components/Keyboard-events.vue";
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
      currentModal: "",
      isModalVisible: false,
      displayedImages: [],

      tryNumber: 5,
      gameStatus: 0,
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
    },
  },
  methods: {
    async getData() {
      let results = await fetch(
        `https://api.themoviedb.org/3/list/8199288?api_key=42f1941bec5c4006006323f020c28fa5&language=es-ES`
      );
      let json = await results.json();
      // Peticion de peliculas a la api
      this.actualMovie =
        json.items[Math.floor(Math.random() * json.items.length - 1)];

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
    letterClicked(letter) {
      letter = letter.toLowerCase();

      let normalizedMovie = this.movieTitle;

      const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      normalizedMovie = removeAccents(normalizedMovie);

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
    checkVictory(normalizedMovie){
      // Hacemos una comprobación de si hemos ganado
      console.log("Vamos a comprobar si hemos ganado.");
      let contError = 0;
      console.log("contError: ", contError);

      normalizedMovie.split("").forEach((element) => {
        if (!this.guessedLetters.includes(element) && element != ' ' && !this.isSpecial(element)) {
          contError++;
        }
      });

      if (contError == 0) {
        this.gameStatus = 2;        
      }

    },
    isSpecial(letter) { // Comprobamos si un elemento es especial
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
    closeModal() {
      this.isModalVisible = false;
      this.currentModal = undefined;
    },
    openModal(modal) {
      this.isModalVisible = true;
      this.currentModal = modal;
    },
  },
};
</script>

<template >
  <Options />
  <main>
    <KeyboardEvents @keyup="letterPressed"></KeyboardEvents>
    <div class="slider-movie">
      <!--<SliderMovie>-->
      <img class="logo" src="/img/logo-b-cinedebarrio-white.png" alt="logo" />
      <Slider :ArrayMovies="displayedImages" />
    </div>
    <panel-letters :text="movieTitle" :guessedLetters="guessedLetters" />
    {{ this.gameStatus }}
    <keyboard
      :popcornNumber="tryNumber"
      :letters="letterArray"
      @clickedLetter="(id) => letterClicked(id)"
    />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
@import "./assets/base.css";
@import "./assets/style.css";

#app {
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
  z-index: 1;
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
</style>
