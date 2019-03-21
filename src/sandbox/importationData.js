const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const imdb = require('../scrape_film/imdb.js');

const CONNECTION_URL = "mongodb+srv://MathieuJsrd:Rosalie1801@cluster0-5iyod.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "Denzel_Cluster_Joss";
const DENZEL_IMDB_ID = 'nm0000243';


const importationData = () =>{
    var movieLoading = new Promise(function(resolve, reject) {
        console.log(`📽️  fetching filmography...`);
        var myMovies = imdb(DENZEL_IMDB_ID);
        resolve(myMovies);
      });
    movieLoading.then(function(movies) {
        console.log("Movies loaded !");
        var app = Express();
    
        app.use(BodyParser.json());
        app.use(BodyParser.urlencoded({ extended: true }));
    
        var database, collection;
            MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
                if(error) {
                    throw error;
                }
                database = client.db(DATABASE_NAME);
                console.log("Connected to `" + DATABASE_NAME + "`!");
                collection = client.db("ListOfMovies").collection("Movie");
                collection.insert(movies, null, function(error, results){
                if(error) throw error;
                    console.log("data imported in mongodb");
                })
                client.close();
            });
      }); 
}

module.exports = importationData;


