
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
      isItBlackMode: true,
      toggle: false,
      active: false,
      srcInfoIcon: "/svg/info_black_48dp.svg",
      isModalVisible: false,
      currentModal: undefined,
      darkTheme: false,
    }
  },
  methods: {
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
  <modal
    :is-modal-visible="isModalVisible"
    @close-modal="closeModal"
  >
    <component :is="currentModal" />
  </modal>
  <div>
    <nav class="icons">
      <div v-if="toggle">
        <img
          @mouseover="onMouseOverInfo"
          @mouseleave="onMouseLeaveInfo"
          :src="srcInfoIcon"
          alt="info"
        >
        <img
          class="help"
          src="/svg/help_black_48dp.svg"
          alt="help"
        >
      </div>

      <div v-else>
        <img
          @click="openModal(Info)"
          class="info"
          src="/svg/info_white_48dp.svg"
          alt="info"
        >
        <img
          @click="openModal(Rules)"
          class="help"
          src="/svg/help_white_48dp.svg"
          alt="help"
        >

        <select
          class="languages"
          v-model="$i18n.locale"
        >
          <option value="es-ES">
            ES
          </option>
          <option value="ca">
            CA
          </option>
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
  margin: 10px;
}

.languages option {
  background-color: black;
  color: white;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-weight: 700;

}

.languages:hover {
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