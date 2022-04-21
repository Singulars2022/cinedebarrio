<template>
  <div class="info">
    <h2 class="title">{{ $t( 'info.title' ) }}</h2>
    <ul>
      <li>{{ $t( 'info.intro' ) }}</li>
      <li class="question">{{ $t( 'info.firstQuestion' ) }}</li>
      <li>{{ $t( 'info.firstAnswer' ) }}</li>
      <li class="question">{{ $t( 'info.secondQuestion' ) }}</li>
      <li>{{ $t( 'info.secondAnswer' ) }}</li>
    </ul>
  </div>
</template>

<style scoped>
.title {
  background-color: rgb(135, 1, 1);
  color: white;
}

.question {
    font-weight: bold;
}

.title,
li {
  text-align: center;
}

.info {
  margin: auto;
  width: 80%;
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