
<script>
export default {
  props: {
    letters: Array,
  },
  emits: ["guessedLettersPush"],
  data() {
    return {};
  },
  methods: {
    checkLetter(letter) {
      this.$emit("guessedLettersPush", letter);
    },
  },
};
</script>

<template>
  <div>
    <p class="keyboardLines" v-for="(letterRow, index) in letters" :key="index">
      <span
        v-for="(letter, index2) in letterRow"
        :key="index2"
        @click="checkLetter(letter.letter)"
        class="keyStyles"
        :class="
          letter.status == 'default'
            ? 'keyIsDefault'
            : letter.status == 'correct'
            ? 'keyIsCorrect'
            : 'keyIsWrong'
        "
      >
        {{ letter.letter }}
      </span>
    </p>
    <!-- <p>{{movie}}</p> -->
  </div>
</template>


<style>
.keyboardLines {
  text-align: center;
}

.keyStyles {
  background-color: transparent;
  text-align: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
}

.keyIsDefault {
  color: white;
  background-color: transparent;
  border: 2px solid grey;
}
.keyIsDefault:active {
  background-color: pink;
}

.keyIsCorrect, .keyIsCorrect:active {
    color: white;
  border: 2px solid #2aa800;
}


.keyIsWrong {
    color: white;
  background-color: #b70000;
  border: 2px solid transparent;
}
</style>