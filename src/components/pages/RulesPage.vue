<script setup>
import { toggleFullscreen } from "@/utils/utils.js";
</script>
<template>
  <div class="rules">
    <h2 class="title">{{ $t('rules.title') }}</h2>
    <ul>
      <li>{{ $t('rules.intro') }}</li>
      <li>{{ $t('rules.firstRule') }}
        <img src="/img/instructions/instrucciones-pantalla-completa.jpg" :alt="$t('rules.firstRuleImgDescription')">
      </li>
      <li>{{ $t('rules.secondRule') }}
        <img src="/img/instructions/instrucciones-teclado.jpg" :alt="$t('rules.secondRuleImgDescription')">
      </li>
      <li>{{ $t('rules.thirdRule') }}
        <img src="/img/instructions/instrucciones-panel.jpg" :alt="$t('rules.thirdRuleImgDescription')">
      </li>
      <li>
        {{ $t('rules.fourthRule') }}
        <img src="/img/instructions/instrucciones-demo.png" :alt="$t('rules.fourthRuleImgDescription')">
      </li>
      <li>{{ $t('rules.fifthRule') }}
        <!-- <img src="/peli1.jpg" alt="Ejemplo del funcionamiento del carrousel."> -->
      </li>
    </ul>
    <p>{{ $t('rules.end') }}</p>
    <br>
    <p>{{ $t('rules.recommendFullscreen') }}<span class="full-screen-icon" @click="toggleFullscreen(document)"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></span></p>
  </div>
  <div class="paloma-container">
    <img id="paloma" src="/img/instructions/instrucciones-paloma.png" alt="">
  </div>
</template>

<style scoped>
.title {
  background-color: rgb(135, 1, 1);
  color: white;
  font-weight: bold;
  font-size: 30px;
}

.title,
p,
li {
  text-align: center;
}

.rules {
  margin: auto;
  padding: 0 20%;
  position: relative;
  /* background-image: url("/img/instructions/instrucciones-paloma.png");
  background-size: 200px;
  background-attachment: scroll fixed;
  background-repeat: no-repeat;
  background-position: bottom right; */
  /* background */
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 1.5rem;
  margin: 2rem 0;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: .5rem;
}

img {
  width: 400px;

}

.paloma-container {
  display: flex;
  flex-direction: row;
  justify-content: end;
  position: sticky;
  bottom: 0;
}


#paloma {
  min-width: 150px;
  width: 15%;
  margin-left: auto;
}

@media (max-width: 1200px) {
  .paloma-container {
    display: none;
  }
}
</style>