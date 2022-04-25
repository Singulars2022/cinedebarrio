<template>
  <span style="display: none">
    Contenido que justifica mi exsitencia.
  </span>
</template>

<script>export default {
  emits:['keyup'],
  created() {
    const component = this;
    this.handler = function (e) {
      component.$emit('keyup', e);
    }
    window.addEventListener('keyup', this.handler);
  },
  beforeUnmount() {
    window.removeEventListener('keyup', this.handler);
  }
}
</script>

