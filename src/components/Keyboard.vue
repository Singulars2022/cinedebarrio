
<script>
export default {
  props: {
    letters: Array,
  },
  emits: ["clickedLetter"],
  data() {
    return {};
  },
  methods: {
    checkLetter(letter) {
      this.$emit("clickedLetter", letter);
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
  </div>
</template>


<style scoped>
div{
  padding: 10px;
}
.keyboardLines {
  text-align: center;  
}

.keyStyles {
  background-color: #303030 ;
  text-align: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  margin: 3px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
  user-select: none;  
}

.keyIsDefault {
  color: white;
  background-color:#303030;
  border: 2px solid grey;
  cursor: pointer;
}
.keyIsDefault:active {
  background-color: rgb(87,0,0);
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