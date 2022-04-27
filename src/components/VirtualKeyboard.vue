<script setup>
import { dragElement } from "@/utils/utils.js";</script>
<script>
export default {
  props: {
    letters: {
      type: Array,
      required: true
    },
    chances: {
      type: Number,
      required: true
    },
  },
  emits: ["clicked-Letter"],
  data() {

    return {

    };
  },
  methods: {
    emitLetter(letter) {
      this.$emit("clicked-Letter", letter);
    },
  },
  mounted() {
    dragElement(document.getElementById("keyboardContainer"), document.getElementById("drag-icon"));
  }
};
</script>

<template>
  <div>
    <div class="tryCount">
      <div class="popcornContent">
        <span>Intentos:</span>
        <div class="popcornPoints">
          <div v-for="i in chances" :key="i">
            🍿
          </div>
        </div>
      </div>
    </div>

    <div id="keyboardContainer">
      <span id="drag-icon"><i class="fa-solid fa-arrows-up-down-left-right" /></span>
      <p class="keyboardLines" v-for="(letterRow, index) in letters" :key="index">
        <span v-for="(letter, index2) in letterRow" :key="index2" @click="emitLetter(letter.letter)" class="keyStyles"
          :class="
            letter.status == 'default'
              ? 'keyIsDefault'
              : letter.status == 'correct'
                ? 'keyIsCorrect'
                : 'keyIsWrong'
          ">
          {{ letter.letter }}
        </span>
      </p>
    </div>
  </div>
</template>


<style scoped>
[v-cloak] {
  display: none;
}

div {
  padding: 3px;
}

.keyboardLines {
  text-align: center;
  padding: 8px;

}

#drag-icon {
  font-size: 40px;
  cursor: grab;
}

.keyStyles {
  background-color: #303030;
  text-align: center;
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 3px;
  margin: 3px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: bold;
  font-size: clamp(12px, 2rem, 20px);
  user-select: none;
}

.keyIsDefault {
  color: white;
  background-color: #303030;
  border: 2px solid grey;
  cursor: pointer;

}

.keyIsDefault:active {
  background-color: rgb(87, 0, 0);
}

.keyIsCorrect,
.keyIsCorrect:active {
  color: white;
  border: 2px solid #2aa800;
}

.keyIsWrong {
  color: white;
  background-color: #b70000;
  border: 2px solid transparent;
}

.popcornPoints {
  display: flex;
  justify-content: flex-start;
  width: 250px;
}

.tryCount {
  display: flex;
  color: white;
  font-size: clamp(16px, 2rem, 80px);
  justify-content: center;
  align-items: center;
}

.popcornContent {

  display: flex;
  align-items: center;
  justify-content: center;
}

#keyboardContainer {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}

.keyboardLines {
  display: flex;
  flex-direction: row;
  justify-content: center;

}

.keyboardLines,
#keyboardContainer {
  text-align: center;
  flex-wrap: nowrap !important;
}
</style>