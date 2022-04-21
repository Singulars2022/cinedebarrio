<template>
  <div class="rules">
    <h2 class="title">{{ $t( 'rules.title' ) }}</h2>
    <ul>
      <li>{{ $t( 'rules.intro' ) }}</li>
      <li>{{ $t( 'rules.firstRule' ) }}
        <img src="/img/instructions/instrucciones-pantalla-completa.jpg" :alt="$t( 'rules.firstRuleImgDescription')">
      </li>
      <li>{{ $t( 'rules.secondRule' ) }}
        <img src="/img/instructions/instrucciones-teclado.jpg" :alt="$t( 'rules.secondRuleImgDescription')">
      </li>
      <li>{{ $t( 'rules.thirdRule' ) }}
        <img
          src="/img/instructions/instrucciones-panel.jpg" :alt="$t( 'rules.thirdRuleImgDescription')"></li>
      <li>
        {{ $t( 'rules.fourthRule' ) }}
        <img src="/img/instructions/instrucciones-demo.jpg" :alt="$t( 'rules.fourthRuleImgDescription')">
      </li>
      <li>{{ $t( 'rules.fifthRule' ) }}
        <!-- <img src="/peli1.jpg" alt="Ejemplo del funcionamiento del carrousel."> -->
      </li>
    </ul>
    <p>{{ $t( 'rules.end' ) }}</p>
  </div>
</template>

<style scoped>
.title {
  background-color: rgb(135, 1, 1);
  color: white;
}

.title,
p,
li {
  text-align: center;
}

.rules {
  margin: auto;
  width: 60%;
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
</style>