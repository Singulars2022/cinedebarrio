
<script>
export default {
  data() {
    return {
      modalShow: false,
    };
  },
};
</script>

<template>
 <transition name="modal-fade">
  <div v-if="modalShow" class="modal">
    <div class="modal-content">
        <slot name="content"></slot>
      <span class="closeModal" @click="modalShow = !modalShow">&#9932;</span>
    </div>
  </div>
 </transition>
  <span @click="modalShow = !modalShow">
    <slot name="button"></slot>
  </span>
</template>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
.modal-content {
  box-shadow: 0px 0px 15px 0px white;
  position: relative;
  background-color: rgb(135, 1, 1);
  width: 70%;
  padding: 50px 50px;
  color:white;
}

.closeModal {
  position: absolute;
  top: 15px;
  right: 15px;
  transition: transform 0.2s;
  font-size: 2rem;
}
.closeModal:hover {
  color: white;
  transform: scale(1.2);
}

span{
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
  

</style>