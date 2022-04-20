<script setup>
import PanelLetters from "./components/PanelLetters.vue";
import keyboard from "./components/Keyboard.vue";
import Slider from "./components/Slider.vue";
</script>

<script>
let movies = ["peli1.jpg", "peli2.png", "peli3.jpg"];

export default {
  components: { keyboard },
  data() {
    return {
      uid: 0,
      guessedLetters: [],
      actualMovie: [],
      Panelmovie: {images:[],videos:[],title:''},
      letterArray: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
        ["z", "x", "c", "v", "b", "n", "m"],
      ],      
    };
  },
  created() {
    // Peticion Fetch a TMDB    
    this.getFilms();

    // Creación del teclado
    this.letterArray = this.letterArray.map(arrayRow => {
        return arrayRow.map(l => {
          return {
            id: this.uid++,
            letter: l,
            status: "default"
          }
        });
      });      
  },
  computed: {
    lettersControl() {
      return this.letterArray;
    },
    movieTitle() {
      return this.Panelmovie.title.toLowerCase();
    }
  },
  methods: {
    async getFilms(){
      // COnfiguración de la url
      let apiKey = '42f1941bec5c4006006323f020c28fa5';
      let listId = '8199288';

      // Llamada a los datos.
      let results = await fetch(`https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&language=es-ES`);
      let json = await results.json();
      
      // Peticion de peliculas a la api
      this.actualMovie = json.items[Math.floor(Math.random() * json.items.length -1)];

      // Añadimos imagenes a nuestra api 
      await this.getFilmData();

      // Obtenemos el titulo de la api
      this.Panelmovie.title = this.actualMovie.title
      
      // Creamos un array de imagenes con la portada y un frame de la pelicula
      const path_to_images = 'https://image.tmdb.org/t/p/original'
      
      // Si existen los frames de la pelicula los introducimos
      if(this.actualMovie.images.backdrops != null){
        this.actualMovie.images.backdrops.forEach(image=>{
          this.Panelmovie.images.push(path_to_images+image.file_path)
        })
      }
      // Si no conseguimos ninguino ponemos el que tiene la pelicula
      if(this.Panelmovie.images.length == 0 && this.actualMovie.images.backdrop_path != null){
        this.Panelmovie.images.push(path_to_images+this.actualMovie.backdrop_path);
      }

      // Si de verdad no hay ningun tipo de frame ponemos el poster como ultimo recurso.
      if(this.Panelmovie.images.length == 0 && this.actualMovie.poster_path != null){
        this.Panelmovie.images.push(path_to_images+this.actualMovie.poster_path);
      }

      // Si existen videos los introducimos en un array aparte.
      if(this.actualMovie.videos.results.length > 0){
        this.Panelmovie.videos.forEach(video => {
          // Hay que construir los enlaces a youtube / vimeo
          console.log(video);
          let url = '';
          if(video.site == 'YouTube'){
            url = `https://www.youtube.com/embed/?v=${video.key}`;            
          }

          this.Panelmovie.videos.push(url)

        })
      }
    },
    async getFilmData(){      
      let results = await fetch(`https://api.themoviedb.org/3/movie/${this.actualMovie.id}?api_key=42f1941bec5c4006006323f020c28fa5&append_to_response=images,videos&language=es-ES`);
      let json = await results.json();
      this.actualMovie = json;
    },
    letterClicked(letter) {
      const clickedLetter = []
        .concat(...this.letterArray)
        .find((l) => l.letter == letter);

      if (!this.guessedLetters.includes(clickedLetter.letter)) {
        if (this.movieTitle.includes(clickedLetter.letter)) {
          clickedLetter.status = "correct";
        } else {
          clickedLetter.status = "wrong";
          this.arrayMovie.push(movies.pop());
        }
        this.guessedLetters.push(clickedLetter.letter);
      }
    }
  }
}

</script>

<template>
  <main>
    <h1>Cine de Barrio</h1>    
    <Slider :ArrayMovies="Panelmovie.images" />
    <panel-letters :text="movieTitle" :guessedLetters="guessedLetters" />
    <keyboard
      :letters="letterArray"
      @clickedLetter="(id) => letterClicked(id)"
    />
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    flex-direction: column;
  }

  #app {
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
