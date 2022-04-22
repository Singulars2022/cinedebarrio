<template>
  <div class="info">
    <h2 class="title">{{ $t('info.title') }}</h2>
    <ul>
      <li>{{ $t('info.intro') }}</li>
      <li class="question">{{ $t('info.firstQuestion') }}</li>
      <li>{{ $t('info.firstAnswer') }}</li>
      <li class="question">{{ $t('info.secondQuestion') }}</li>
      <li>{{ $t('info.secondAnswer') }}</li>
      <li>
        <div class="buttons logos-delboton">
          <a href="https://github.com/Singulars2022/cinedebarrio" target="_blank">
            <img class="logo-item" src="/img/github-logo.png" alt="">
          </a>
          <a href="https://www.linkedin.com/groups/12653166/" target="_blank">
            <img class="logo-item" src="/img/linkedin-logo.png" alt="">
          </a>
          <a href="https://singulars2022.github.io/cinedebarrio-landingpage/" target="_blank">
            <img class="logo-item" src="/img/logo-b-cinedebarrio-black.png" alt="">
          </a>
        </div>
      </li>
    </ul>

  </div>
</template>

<style scoped>
.title {
  background-color: rgb(135, 1, 1);
  color: white;
  font-weight: bold;
  font-size: 30px;
}

.logos-delboton {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  gap: 1rem;
  position: relative;
}

.logo-item {
  width: 50px;
}

.question {
  font-weight: bold;
  font-size: 20px;
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
</style>