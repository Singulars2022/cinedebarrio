
<script>

export default {
  data() {
    return {
      toggle: false,
      active: false,
      srcInfoIcon: '/svg/info_black_48dp.svg'

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
    }
  }
}
</script>
<template>
  <!-- <main :class="[toggle ? 'var--vt-c-white' : '--vt-c-black']"> -->
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
        <img class="info" src="/svg/info_white_48dp.svg" alt="info">
        <!-- <img v-on:mouseover="active = !active" src="/svg/info_white_48dp.svg" alt="info"> -->
        <img class="help" src="/svg/help_white_48dp.svg" alt="help">
        <!-- <img v-on:mouseover="active = !active" src="/svg/help_white_48dp.svg" alt="help"> -->
        <!-- <img class="light animate__animated animate__rubberBand " @click="ontoggle" src="/svg/toggle_off_white_48dp.svg" 
  alt="toggle-light"> -->
      </div>
    </nav>
  </div>
</template>

<style scoped>
.icons div {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;

}
</style>