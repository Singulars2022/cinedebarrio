import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: navigator.language,
    messages: {
        "es-ES": {
            instructionRules: 'Instrucciones'

        },

        ca: {
            instructionRules: 'Instruccions'
        }
    }
})

console.log(navigator);

createApp(App)
    .use(i18n)
    .mount('#app')
