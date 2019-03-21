const imdb = require('../scrape_film/imdb.js');
var MongoClient = require('mongodb').MongoClient;
const DENZEL_IMDB_ID = 'nm0000243';


async function sandbox (actor) {
  try {
    console.log(`📽️  fetching filmography of ${actor}...`);
    //Waiting for movies
    const movies = await imdb(actor);
    //Once we get the movies
    const awesome = movies.filter(movie => movie.metascore >= 77);

    console.log(`🍿 ${movies.length} movies found.`);
    console.log(JSON.stringify(movies, null, 2));
    const moviesJson = await JSON.stringify(movies, null, 2); //done
    console.log(`🥇 ${awesome.length} awesome movies found.`);
    console.log(JSON.stringify(awesome, null, 2));

    //const uri = "mongodb+srv://MathieuJsrd:Rosalie1801@cluster0-5iyod.mongodb.net/test?retryWrites=true";


    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
sandbox(DENZEL_IMDB_ID);
/*
async function import_data (moviesToImport){
    try{
        
      const uri = "mongodb+srv://MathieuJsrd:Rosalie1801@cluster0-5iyod.mongodb.net/test?retryWrites=true";

        const client = new MongoClient(uri, { useNewUrlParser: true });
        //Mongo cluster address
        console.log("je passe 1");
        client.connect(err => {
            console.log("je passe 2");
            const collection = client.db("ListOfMovies").collection("Movie");
            collection.insert(movie, null, function(error, results){
              if(error) throw error;
              console.log("data imported in mongodb");
            })
            // perform actions on the collection object
            client.close();
        });

        //const client = new MongoClient(uri, { useNewUrlParser: true });

        /*client.connect(err => {
        const collection = client.db("ListOfMovies").collection("Movie");
        collection.insert(moviesJson, null, function (err, results) {
            if (err) throw err;
            console.log("document inserted ! :D");    
        });
            client.close();
        });
 
    }
    catch(e){
        console.error(e);
    }
}
*/


