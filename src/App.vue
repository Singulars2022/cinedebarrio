<script setup>
import PanelLetters from "./components/PanelLetters.vue";
import keyboard from "./components/Keyboard.vue";
import helpIcon from "./assets/icons/help_white_48dp.svg";
import Rules from "./components/pages/Rules.vue";
import Info from "./components/pages/Info.vue";
import Modal from "./components/UX/Modal.vue";
import Slider from "./components/Slider.vue";
import Options from "./components/Options.vue";
import KeyboardEvents from "./components/Keyboard-events.vue"
</script>

<script>
let movies = ["peli1.jpg", "peli2.png", "peli3.jpg"];

export default {
  components: { Modal },
  data() {
    return {
      uid: 0,
      guessedLetters: [],
      movie: "El club de la lucha",
      letterArray: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
        ["z", "x", "c", "v", "b", "n", "m"],
      ],
      currentModal: "",
      modals: [],
      isModalVisible: false,
      arrayMovie: [movies.pop()]
    };
  },
  created() {
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
  },
  methods: {
    letterClicked(letter) {
      letter = letter.toLowerCase();
      const clickedLetter = []
        .concat(...this.letterArray)
        .find((l) => l.letter == letter);

      if (!this.guessedLetters.includes(clickedLetter.letter)) {
        if (this.movie.includes(clickedLetter.letter)) {
          clickedLetter.status = "correct";
        } else {
          clickedLetter.status = "wrong";
          if (movies.length > 0) {
            this.arrayMovie.push(movies.pop());
          }
          else {
            return
          }
        }
        this.guessedLetters.push(clickedLetter.letter);
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
    }
  },
};
</script>

<template >
  <Options />
  <main>
    <KeyboardEvents @keyup="letterPressed"></KeyboardEvents>
    <div class="slider-movie">
      <!--<SliderMovie>-->
      <img class="logo" src="/img/logo-b-cinedebarrio-white.png" alt="logo">
      <Slider :ArrayMovies="arrayMovie" />

    </div>
    <panel-letters :text="movie" :guessedLetters="guessedLetters" />
    <keyboard :letters="letterArray" @clickedLetter="(id) => letterClicked(id)" />

    <!--
    <modal :isModalVisible="isModalVisible" @close="closeModal">
      <component :is="currentModal" class="modal"></component>
    </modal>
    <button @click="openModal(Rules)">Open Rules</button>
    <button @click="openModal(Info)">Open Info</button> -->
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
