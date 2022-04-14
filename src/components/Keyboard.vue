
<script>
export default {
  props: {
    movie: String,
    guessedLetters: Array
  },
  emits: ["guessedLettersPush"],
  data() {
    return {
      letterArray: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
        ["z", "x", "c", "v", "b", "n", "m"],
      ],
    };
  },
  methods: {
    checkLetter(e) {
      let key= e.target.innerText.toLowerCase();
      if (this.guessedLetters.includes(key)) {
        return;
      }      
      this.$emit("guessedLettersPush", key);
      if (this.movie.toLowerCase().includes(key)) {
        e.target.classList.add("keyIsCorrect");
      } else {
        e.target.classList.add("keyIsWrong");
      }
    },
  },
};
</script>

<template>
  <div>
    <p
      class="keyboardLines"
      v-for="(letterRow, index) in letterArray"
      :key="index"
    >
      <span
        @click="checkLetter"
        class="keyStyles"
        v-for="(letter, index2) in letterRow"
        :key="index2"
        >{{ letter }}</span
      >
    </p>
    <!-- <p>{{movie}}</p> -->
  </div>
</template>


<style>
.keyboardLines {
  text-align: center;
}
.keyStyles {
  color: white;
  text-align: center;
  width: 40px;
  padding: 5px;
  border: 2px solid grey;
  border-radius: 5px;
  margin: 3px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
}

.keyStyles:active{
  background-color: pink;
}

.keyIsCorrect:active {
  border-color: #2AA800;
  background-color: transparent;
}
.keyIsWrong:active{
   background-color: #B70000;
}

.keyIsCorrect{
  border-color: #2AA800;
}
.keyIsWrong{
  background-color: #B70000;
  border-color: transparent;

}
</style>