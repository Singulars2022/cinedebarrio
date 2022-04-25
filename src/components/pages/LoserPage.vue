<template>
  <h1>{{ $t("lose.title") }}</h1>
    
  <div class="loserContent">
    <img
      src="/img/PalomaPerdedoraRecortada.png"
      alt="Carmen ha perdido :( "
    >
    <div class="description">
      <p>{{ $t("lose.loseText") }}</p>
      <button @click="reloadPage">
        {{ $t("lose.btnText") }}
      </button>        
    </div>
  </div>    
</template>

<script setup>
import {reloadPage}  from '@/utils/utils.js'
</script>


<style scoped>
    .loserContent{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .loserContent button{
        background: black;
        color: white;
        border-radius: 1em;
        padding: 1em;
        font-size: 1em;        
        border: 0px transparent;
        cursor: pointer;
        margin-top: 1em;
    }
    p{
        font-size: 1.2em;
    }
    h1{
        text-align: center;
        text-transform: uppercase;
    }
    .description{
        display: flex;
        flex-direction: column;
    }    
</style>