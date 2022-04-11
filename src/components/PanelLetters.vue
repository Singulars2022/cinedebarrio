

<script>
export default {
    props: ["text", "guessedLetters"]
}
</script>

<template>
    <div>
        <span :class="{ 'empty': letter == ' ' }" v-for="(letter, index) in text" :key="index">
            <span class="letter" v-if="guessedLetters.includes(letter)"> {{ letter }}
            </span>
            <span class="letter" v-else>
            </span>
        </span>
    </div>
</template>

<style scoped>
.empty {
    background-color: transparent;
    border: none;
}

div {
    display: flex;
    text-transform: uppercase;
}

span.letter {
    font-size: 1.2rem;
    background-color: brown;
    padding: 5px;
    border: black solid 1px;
    width: 50px;
    text-align: center;
    font-weight: 700;
}
</style>