<script setup>
import { toggleFullscreen } from "@/utils/utils.js";
import Modal from "./UX/ModalUXComponent.vue";
</script>

<script>
export default {
  props: {
    "arrayImagesMovies": {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      arraySlider: this.arrayImagesMovies,
      indexSlider: 0,
      isModalVisible: false,

    };
  },
  computed: {
    getURL() {
      return `url(${this.arraySlider[this.indexSlider]})`;
    },
    getSrcURL() {
      return this.arraySlider[this.indexSlider];

    }
  },
  methods: {
    SwitchImage(value) {
      this.indexSlider = value;
    },
    openModal() {
      this.isModalVisible = true;
    }
  },
  watch: {
    arraySlider: {
      handler() {
        this.indexSlider = this.arraySlider.length - 1;
      },
      deep: true,
    },
  },
};
</script>
 
<template>
  <modal :is-modal-visible="isModalVisible" @close-modal="isModalVisible = false">
    <!-- <div style="height: 100vh; width: 100vw"
      :style="{ backgroundImage: getURL, backgroundSize: indexSlider == 0 ? '' : 'contain' }" class="movie"> </div> -->
    <img :src="getSrcURL" alt="">
  </modal>
  <div @click="openModal" class="slider">
    <div :style="{ backgroundImage: getURL, backgroundSize: indexSlider == 0 ? '' : 'contain' }" class="movie">
      <div class="main-div">
        <nav>
          <ul v-show="arraySlider.length > 1" class="menu">
            <li class="slide-fwd-center" v-for="(_, index) in arraySlider" :key="index" @click.stop="SwitchImage(index)"
              href="">
              <span class="indexmovie">{{ index + 1 }} </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
 
<style scoped>
.movie {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
  min-width: 80vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 1rem;
}

.flex {
  display: flex;
  justify-content: space-between;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.indexmovie {
  color: red;
  font-size: 18px;
  font-weight: 700;
}

.menu li:hover {
  cursor: pointer;
  border: 3px solid #570000;
}

.menu li {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid red;
  text-decoration: none;
  background-color: rgba(255, 72, 0, 0);
  padding: 15px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
</style>

// Hacer que el indice del array por defecto sea .length-1

