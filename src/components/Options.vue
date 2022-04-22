
<script setup>
import Modal from "./UX/ModalUXComponent.vue";
import Rules from "./pages/RulesPage.vue";
import Info from "./pages/InfoPage.vue"; // @ significa 'desde la carpeta 'src'
</script>

<script>
export default {
  emits: ["changeTheme"],
  data() {
    return {
      Isitblackmode: true,
      toggle: false,
      active: false,
      srcInfoIcon: "/svg/info_black_48dp.svg",
      isModalVisible: false,
      currentModal: undefined,
      darkTheme: false,
    }
  },
  methods: {
    ontoggle() {
      console.log("toogle");
      this.toggle = !this.toggle;
    },
    onMouseOverInfo() {
      this.srcInfoIcon = "/svg/info_red_48dp.svg";
    },
    onMouseLeaveInfo() {
      this.srcInfoIcon = "/svg/info_black_48dp.svg";
    },
    closeModal() {
      this.isModalVisible = false;
      this.currentModal = undefined;
    },
    openModal(modal) {
      this.isModalVisible = true;
      this.currentModal = modal;
    },
    changeTheme() {
      this.darkTheme = !this.darkTheme;
      this.$emit('changeTheme', this.darkTheme)
    }
  }
}
</script>
<template>
  <!-- <main :class="[toggle ? 'var--vt-c-white' : '--vt-c-black']"> -->
  <!-- Selector para cambiar el idioma mirar fichero main.js -->

  <modal :isModalVisible="isModalVisible" @close="closeModal">
    <component :is="currentModal"></component>
  </modal>
  <div>
    <nav class="icons">
      <div v-if="toggle">
        <img
          @mouseover="onMouseOverInfo"
          @mouseleave="onMouseLeaveInfo"
          :src="srcInfoIcon"
          alt="info"
        />
        <img class="help" src="/svg/help_black_48dp.svg" alt="help" />
        <!-- <img v-if="active" class="info" src="/svg/info_red_48dp.svg" alt="info">
      <img v-on:mouseover="active = !active" class="info" src="/svg/info_black_48dp.svg" alt="info">
      <img v-if="active" class="help" src="/svg/help_red_48dp.svg" alt="help">
    <img v-on:mouseover="active = !active" class="help" src="/svg/help_black_48dp.svg" alt="help"> -->
        <!-- <img class="dark animate__animated animate__rubberBand" @click="ontoggle"  src="/svg/toggle_on_black_48dp.svg" 
  alt="toggle-dark"> -->
      </div>

      <div v-else>        
        <img
          @click="openModal(Info)"
          class="info"
          src="/svg/info_white_48dp.svg"
          alt="info"
        />
        <!-- <img v-on:mouseover="active = !active" src="/svg/info_white_48dp.svg" alt="info"> -->
        <img
          @click="openModal(Rules)"
          class="help"
          src="/svg/help_white_48dp.svg"
          alt="help"
        />
        <!-- <img v-on:mouseover="active = !active" src="/svg/help_white_48dp.svg" alt="help"> -->
        <!-- <img class="light animate__animated animate__rubberBand " @click="ontoggle" src="/svg/toggle_off_white_48dp.svg" 
  alt="toggle-light"> -->
        <select class="languages" v-model="$i18n.locale">
          <option value="es-ES">ES</option>
          <option value="ca">CA</option>
        </select>
        <button @click="changeTheme" class="btn-toggle">
          <i v-if="darkTheme" class="fas fa-sun"></i>

          <i v-else class="fa-solid fa-moon"></i>
        </button>
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
  margin: 10px;
}

.languages option {
  border: none;
  background-color: black;
  color: white;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;

}

.languages:hover {
  border: none;
  background-color: red;
}

.icons div {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;

}

.info {
  margin: 10px;
}

.info:hover {
  border-radius: 100px;
  background-color: red;


}

.help {
  margin: 10px;
}

.help:hover {
  border-radius: 100px;
  background-color: red;
}

.btn-toggle {
  margin: 10px;
  background-color: transparent;
  border: none;
  width: 48px;
  cursor: pointer;
}

.fa-moon,
i {
  font-size: 48px;
  color: white;
}

.fa-moon:hover,
i:hover {
  color: red;
}
</style>