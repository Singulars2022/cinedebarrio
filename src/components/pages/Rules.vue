<template>
  <div class="rules">
    <!-- <h2 class="title">INSTRUCCIONES DEL JUEGO</h2> -->
    <h2 class="title">¿Cómo Jugar?</h2>
    <ul>
      <li>¿Has jugado al ahorcado? ¡Pues esto es parecido, pero con películas de la época dorada!</li>
      <li>Te vamos a presentar algunas escenas de una película y tu objetivo será desvelar el título.
        <img src="/img/instructions/instrucciones-pantalla-completa.jpg" alt="Ejemplo visual de la pantalla de juego.">
      </li>
      <li>Para completar el título, puedes usar el teclado del ordenador o el que tienes en pantalla.
        <img src="/img/instructions/instrucciones-teclado.jpg" alt="Ejemplo del teclado.">
      </li>
      <li>Este es el panel se irán descubriendo las letras correctas que vayas pulsando.<img
          src="/img/instructions/instrucciones-panel.jpg" alt="Ejemplo del panel."></li>
      <li>
        Si adivinas una letra correcta, ésta se pintará de color verde y la letra aparecerá en su panel correspondiente.
        Si
        la letra es incorrecta se pondrá de color rojo y uno de tus cinco intentos.
        <img src="/img/instructions/instrucciones-demo.jpg" alt="Ejemplo del panel con letras correctas e incorrectas.">
      </li>
      <li>Cada vez que falles, tendrás disponible una imagen nueva.
        <!-- <img src="/peli1.jpg" alt="Ejemplo del funcionamiento del carrousel."> -->
      </li>
    </ul>
    <p>¿Serás capaz de adivinar todas? ¿Qué tanto sabes de cine?</p>
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