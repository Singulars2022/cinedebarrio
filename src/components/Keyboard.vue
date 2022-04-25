
<script>
export default {
  props: {
    letters: Array,
    popcornNumber: Number,
  },
  emits: ["clickedLetter"],
  data() {
    
    return {
         
    };
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
    <div class="tryCount">
      <div class="popcornContent">  
        <span>Intentos:</span>
        <div class="popcornPoints">
          <div v-for="i in this.popcornNumber" :key="i">🍿</div>
        </div>
      </div>
    </div>
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
[v-cloak]  {
  display: none;
}
div {
  padding: 3px;
}
.keyboardLines {
  text-align: center;
  padding: 8px;
  
}

.keyStyles {
  background-color: #303030 ;
  text-align: center;
  width: clamp(20px, 1.5rem, 20px);
  height: clamp(20px, 1.5rem, 20px);
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 3px;
  margin: 3px;
  /* display: inline-block; */
  text-transform: uppercase;
  font-weight: bold;
  font-size: clamp(12px, 2rem, 20px);
  user-select: none;
}

.keyIsDefault {
  color: white;
  background-color:#303030;
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
  font-size: clamp(10px, 1.5rem, 40px);
  justify-content: center;
  align-items: center;
}

.popcornContent{
  
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>