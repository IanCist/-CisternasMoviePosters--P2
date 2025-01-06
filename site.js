/* SITE.JS: THIS FILE CONTAINS THE METHODS/FUNCTIONS AND VARIABLES CONTROLLING YOUR SITE
//
*/

/* NOTE: MOVIES.JSON CONTAINS A LIST OF MOVIES AND ACCOMPANYING METADATA
//
//    They are in the following format:
//    title (String): the name of the movie
//    iscore (Number): the IMDB score
//    rating (String): the movie's MPAA rating
//    released (Array): the release date. Note that the order of the array is:  YYYY, MM, DD
//    country (String): the country of production
//    posters (Array): an array of String values with the URL to movie posters (in your img/ directory)
//    imdb (String): the URL to the corresponding IMDB website
//    website (String): the URL to the corresponding official website
//    likes (Number): a fictitious number of user likes
//    dislikes (Number): a fictitious number of user dislikes
//    posterindex (Number): a counter to use with the "posters" array to keep track of the current displayed poster index
//
// FOR STEP 16, ADD THREE OF YOUR OWN FAVORITE MOVIES WITH METADATA TO THE END OF THE JSON FILE LIST
*/


const vue_app = Vue.createApp({
      // Automatically imports your movies.json file
      created() {
        fetch('movies.json')
          .then((response) => response.json())
          .then((json) => {
            this.movies = json;
    
            // Load likes and dislikes from localStorage
            this.loadLikesAndDislikes();
          });
      },
      data() {
        return {
          // Holds your movies.json data
          movies: [],
          appTitle: "IS219 Movie Gallery",
          owner: "Ian Cisternas",
          githubLink: "https://github.com/IanCist/-CisternasMoviePosters--P2"
        };
      },
      methods: {
        makeTextDate(dateArray) {
          const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          const month = months[dateArray[1] - 1]; // Subtract 1 because months array is 0-indexed
          const day = dateArray[2];
          const year = dateArray[0];
          return `${month} ${day}, ${year}`;
        },
        like(index) {
          if (this.movies[index]) {
            this.movies[index].likes++;
            this.saveLikesAndDislikes(); // Save to localStorage
          }
        },
        dislike(index) {
          if (this.movies[index]) {
            this.movies[index].dislikes++;
            this.saveLikesAndDislikes(); // Save to localStorage
          }
        },
        posterClick(index) {
          const movie = this.movies[index];
          if (movie) {
            movie.posterindex = (movie.posterindex + 1) % movie.posters.length;
            console.log(`Poster clicked for "${movie.title}". New poster index: ${movie.posterindex}`);
          }
        },
        timeText(minutes) {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          let timeStr = "";
          if (hours > 0) {
            timeStr += `${hours}h `;
          }
          if (mins > 0) {
            timeStr += `${mins}m`;
          }
          return timeStr.trim();
        },
        saveLikesAndDislikes() {
          // Save likes and dislikes to localStorage
          const dataToStore = this.movies.map((movie) => ({
            likes: movie.likes,
            dislikes: movie.dislikes
          }));
          localStorage.setItem("movieRatings", JSON.stringify(dataToStore));
        },
        loadLikesAndDislikes() {
          // Load likes and dislikes from localStorage
          const storedData = localStorage.getItem("movieRatings");
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            this.movies.forEach((movie, index) => {
              if (parsedData[index]) {
                movie.likes = parsedData[index].likes || 0;
                movie.dislikes = parsedData[index].dislikes || 0;
              }
            });
          }
        }
      }
    });
    
    vue_app.mount("#vue_app");
    
