
<script setup>
import Modal from "./UX/Modal.vue";
import Rules from "./pages/Rules.vue";
import Info from "./pages/Info.vue"; // @ significa 'desde la carpeta 'src'
</script>

<script>
export default {
  data() {
    return {
      toggle: false,
      active: false,
      srcInfoIcon: '/svg/info_black_48dp.svg',
      isModalVisible: false,
      currentModal: undefined

    }
  },
  methods: {
    ontoggle() {
      console.log("toogle")
      this.toggle = !this.toggle;
    },
    onMouseOverInfo() {
      this.srcInfoIcon = '/svg/info_red_48dp.svg'
    },
    onMouseLeaveInfo() {
      this.srcInfoIcon = '/svg/info_black_48dp.svg';
    },
    closeModal() {
      this.isModalVisible = false;
      this.currentModal = undefined;
    },
    openModal(modal) {
      this.isModalVisible = true;
      this.currentModal = modal;
    }
  }
}
</script>
<template>
  <!-- <main :class="[toggle ? 'var--vt-c-white' : '--vt-c-black']"> -->
  <!-- Selector para cambiar el idioma mirar fichero main.js -->

  <modal :isModalVisible="isModalVisible" @close="closeModal">
    <component :is="currentModal" class="modal"></component>
  </modal>
  <div>
    <nav class="icons">
      <div v-if="toggle">

        <img @mouseover="onMouseOverInfo" @mouseleave="onMouseLeaveInfo" :src="srcInfoIcon" alt="info">
        <img class="help" src="/svg/help_black_48dp.svg" alt="help">
        <!-- <img v-if="active" class="info" src="/svg/info_red_48dp.svg" alt="info">
      <img v-on:mouseover="active = !active" class="info" src="/svg/info_black_48dp.svg" alt="info">
      <img v-if="active" class="help" src="/svg/help_red_48dp.svg" alt="help">
    <img v-on:mouseover="active = !active" class="help" src="/svg/help_black_48dp.svg" alt="help"> -->
        <!-- <img class="dark animate__animated animate__rubberBand" @click="ontoggle"  src="/svg/toggle_on_black_48dp.svg" 
  alt="toggle-dark"> -->
      </div>
      <div v-else>
        <img @click="openModal(Info)" class="info" src="/svg/info_white_48dp.svg" alt="info">
        <!-- <img v-on:mouseover="active = !active" src="/svg/info_white_48dp.svg" alt="info"> -->
        <img @click="openModal(Rules)" class="help" src="/svg/help_white_48dp.svg" alt="help">
        <!-- <img v-on:mouseover="active = !active" src="/svg/help_white_48dp.svg" alt="help"> -->
        <!-- <img class="light animate__animated animate__rubberBand " @click="ontoggle" src="/svg/toggle_off_white_48dp.svg" 
  alt="toggle-light"> -->
        <select class="languages" v-model="$i18n.locale">
          <option value="es-ES">ES</option>
          <option value="ca">CA</option>
        </select>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.languages {
  border-radius: 16px;
  background-color: transparent;
  color: white;
  font-weight: 700;
}

.languages option {
  color: black;
}

.icons div {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;

}
</style>