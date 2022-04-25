<script setup>

</script>

<script>
export default {
  emits: ["close-modal"],
  props: { "isModalVisible": { type: Boolean, required: true } },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    }
  }
};
</script>

<template>
  <transition name="modal-fade">
    <div
      v-if="isModalVisible"
      class="modal"
      @click.self="closeModal"
    >
      <div class="modal-content animate__animated animate__zoomIn">
        <slot />
        <span
          class="closeModal"
          @click="closeModal"
        >&#9932;</span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 10;
}

.modal-content {
  box-shadow: 0px 0px 15px 0px white;
  position: relative;
  /* background-color: rgb(135, 1, 1); */
  background-color: white;
  width: 70%;
  max-height: 80%;
  padding: 50px 50px;
  /* color: white; */
  color: black;
  overflow-y: auto;
  font-size: 1.2rem;
}

.closeModal {
  position: absolute;
  top: 15px;
  right: 15px;
  transition: transform .1s, color .1s;
  font-size: 2rem;
}

.closeModal:hover {
  color: rgb(135, 1, 1);
  transform: scale(1.2);
}

span {
  cursor: pointer;
}

/* Transition */
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .2s ease;
}

.animate__zoomIn {
  animation-duration: 0.2s;
}
</style>