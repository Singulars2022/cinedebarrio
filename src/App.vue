<script setup>
import PanelLetters from './components/PanelLetters.vue';
import keyboard from './components/Keyboard.vue';
</script>

<script>

export default {
  components: { keyboard },
  data() {
    return {
      uid: 0,
      guessedLetters: [],
      movie: "star wars",
      letterArray: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
        ["z", "x", "c", "v", "b", "n", "m"],
      ],
    }
  },
  created() {
    this.letterArray = this.letterArray.map(arrayRow => {
        return arrayRow.map(l => {
          return {
            id: this.uid++,
            letter: l,
            status: "default"
          }
        });
      });      
  },
  computed: {
    lettersControl() {
      return this.letterArray;
    }
  },
  methods: {
    letterClicked(letter) {
      const clickedLetter = [].concat(...this.letterArray).find(l => l.letter == letter);

      if (!this.guessedLetters.includes(clickedLetter.letter)) {
        if(this.movie.includes(clickedLetter.letter)) {
          clickedLetter.status = "correct";
        } else {
          clickedLetter.status = "wrong";
        }
        this.guessedLetters.push(clickedLetter.letter)
      }
    }
  }
}



</script>

<template>
  <main>
   <h1>Cine de Barrio</h1>
    <panel-letters :text="movie" :guessedLetters="guessedLetters" />
    <keyboard :letters="letterArray" @clickedLetter="(id) => letterClicked(id)"/>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
@import './assets/base.css';
 
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
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

  #app {
    padding: 0 2rem;
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

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
