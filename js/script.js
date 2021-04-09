// CHIAVE API f8a983f5876e6a4d3ad0f337e4f45dff
// ESEMPIO DI CHIAMATA https://api.themoviedb.org/3/movie/550?api_key=f8a983f5876e6a4d3ad0f337e4f45dff


var app = new Vue({
    el: '#root',
    data: {
        risultati: [],
        ricerca: '',
        lingue:['it' , 'en'],
        attori:[],

        generiSelect:'',
        generi:[],




    },

    // methods

    methods: {

      // richiamo le funzioni cercaFilm e cerca serie tv
      cerca:function(){

        const self = this;

        self.risultati=[];
        self.cercaFilm();
        self.cercaTelefilm();
        self.chiamataGeneri();

      },

      // chiamata axios per i film

      cercaFilm:function(){
        const self = this;


        axios.get('https://api.themoviedb.org/3/search/movie/?api_key=f8a983f5876e6a4d3ad0f337e4f45dff&query=' + self.ricerca)
          .then((risposta) => {
            self.risultati = risposta.data.results;
            self.risultati = [...self.risultati, ...risposta.data.results];

            
          });

       },


       chiamataGeneri:function(){
         const self = this;

           axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f8a983f5876e6a4d3ad0f337e4f45dff')
           .then((risposta) =>{
             self.generi = risposta.data.genres
             self.generi.forEach((element) => {
               if(!self.generi.includes(element.name))
               self.generi.push(element.name)
               console.log(self.generi);
             });

           })
           axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=f8a983f5876e6a4d3ad0f337e4f45dff')
           .then((risposta) =>{
             self.generi = risposta.data.genres
             self.generi.forEach((element) => {
               if(!self.generi.includes(element.name))
               self.generi.push(element.name)
               console.log(self.generi);
             });

           })





       },
       // chiamata axios per i telefilm

       cercaTelefilm:function(){
         const self = this;

        axios.get('https://api.themoviedb.org/3/search/tv?api_key=f8a983f5876e6a4d3ad0f337e4f45dff&query=' + self.ricerca)
          .then((risposta) =>{
            self.risultati = risposta.data.results;
            self.risultati = [...self.risultati, ...risposta.data.results];
            console.log(self.risultati);

          });
        },


      locandina:function(poster) {
          if(poster) {
            return 'https://image.tmdb.org/t/p' + '/w342/' + poster
          }else {
            return  'img/404.jpg'
          }
        },


      stelle:function(voto){
        return Math.ceil(voto / 2);
      }

// fine methods
    }
});

Vue.config.devtools = true
