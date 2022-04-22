import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n/index'

const i18n = createI18n({
    locale: navigator.language,
    messages: {
        es: {
            rules: {
                title: "¿Cómo Jugar?",
                intro: "¿Has jugado al ahorcado? ¡Pues esto es parecido, pero con películas de la época dorada!",
                firstRule: "Te vamos a presentar algunas escenas de una película y tu objetivo será desvelar el título.",
                firstRuleImgDescription: "Ejemplo visual de la pantalla de juego.",
                secondRule: "Para completar el título, puedes usar el teclado del ordenador o el que tienes en pantalla.",
                secondRuleImgDescription: "Ejemplo del teclado.",
                thirdRule: "En este panel se irán descubriendo las letras correctas que vayas pulsando.",
                thirdRuleImgDescription: "Ejemplo del panel.",
                fourthRule: "Si adivinas una letra correcta, ésta se pintará de color verde y la letra aparecerá en su panel correspondiente. Si la letra es incorrecta se pondrá de color rojo y perderás uno de tus cinco intentos.",
                fourthRuleImgDescription: "Ejemplo del panel con letras correctas e incorrectas.",
                fifthRule: "Cada vez que falles, tendrás disponible una imagen nueva.",
                end: "¿Qué tanto sabes de cine? ¿Serás capaz de adivinar todas?"
            },
            info: {
                title: "Bienvenido a Cine de Barrio",
                intro: "Este es un proyecto de programación Frontend desarrollado por el grupo Singulars 2022. Es una variación del juego del ahorcado en el que tendrás de descubrir el título de la película por medio de diversas escenas que te vamos a mostrar.",
                firstQuestion: "¿Quiénes somos?",
                firstAnswer: "Somos un grupo de jóvenes estudiantes de programación que a lo largo de 300 horas nos hemos dedicado al aprendizaje y materia de la creación de aplicaciones web.",
                secondQuestion: "¿Por qué hacemos esto?",
                secondAnswer: "Nuestro objetivo con este proyecto es probarle al mundo que somos capaces de trabajar como equipo para crear una aplicación web funcional, elegante y divertida. Nos ilusiona la idea de dedicarnos a trabajar en el sector de la programación, así que esta es una buena manera de ayudarnos a impulsar nuestra carrera."
            }
        },

        ca: {
            rules: {
                title: "Com jugar?",
                intro: "Has jugat mai al penjat? Doncs això és similar, però amb pel·lícules de l'època daurada!",
                firstRule: "Et presentarem algunes escenes d'una pel·lícula i el teu objectiu serà revelar el títol.",
                firstRuleImgDescription: "Exemple visual de la pantalla del joc.",
                secondRule: "Per completar el títol, pots fer ús del teclat de l'ordinador o el que tens a la pantalla.",
                secondRuleImgDescription: "Exemple del teclat.",
                thirdRule: "En aquest panell s'aniran descobrint les lletres correctes que aneu fent clic.",
                thirdRuleImgDescription: "Exemple del panell.",
                fourthRule: "Si encertes una lletra, aquesta es pintarà de color verd i apareixerà al seu panell corresponent. Si la lletra és incorrecta, es posarà de color vermell i perdràs un dels 5 intents.",
                fourthRuleImgDescription: "Exemple del panell i teclat amb lletres correctes i incorrectes.",
                fifthRule: "Cada cop que fallis, tindràs disponible una nova imatge.",
                end: "Què tant saps de cinema? Seràs capaç d'endevinar-les totes?"
            },
            info: {
                title: "Benvingut a Cine de Barrio",
                intro: "Aquest és un projecte de programació Frontend desenvolupat per el grup Singulars 2022. És una variació del joc del penjat on hauràs de revelar el títol de la pel·lícula.",
                firstQuestion: "Qui som?",
                firstAnswer: "Som un grup de joves estudiants de programació que al llarg de 300 hores ens hem dedicat a l'aprenentatje i matèria de la creació d'aplicacions web.",
                secondQuestion: "Per què fem això?",
                secondAnswer: "El nostre objectiu amb aquest projecte és provar al món que som capaços de treballar com a equip per crear una aplicació web funcional, elegant i divertida. Ens il·lusiona la idea de dedicar-nos a treballar al sector de la programació, així que aquesta és un a bona manera d'ajudar-nos a impulsar la nostra carrera."
            }
        }
    }
})

console.log(navigator);

createApp(App)
    .use(i18n)
    .mount('#app');

