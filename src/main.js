import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: "ca",
    messages: {
        es: {
            rules:
                `1: Adivina la pelicula oculta con ayuda de las imagenes de fondo.
            2.Por cada letra fallida tendras una imagen nueva. 

            2.1. Puedes ver todas las imagenes que ya has obtenido haciendo click en los botones que aparecen en la parte inferior de las imagenes.

            3. El color de la letra cambiara denpendiendo si es correcta o no (verde: correctas y rojo: incorrectas).`,

        },

        ca: {
            rules:
                `1: Esbrina la pel·licula amagada amb ajuda de les imatges a pantalla.
2: Per cada lletra fallada optindràs una nova imatge.
 2.1: Pots veure totes les imatges que has obtingut clicànt en els botons que apareixen en la part inferior de les imatges.

            3: El color de la lletra canvia depenent de si has clicat la lletra correcta o no (verd: correcta, vermell: incorrecta)`,

        }

    }
})

createApp(App)
    .use(i18n)
    .mount('#app')
