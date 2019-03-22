const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const importation = require("./sandbox/importationData.js");

const CONNECTION_URL = "mongodb+srv://MathieuJsrd:Rosalie1801@cluster0-5iyod.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "Denzel_Cluster_Joss";
const DENZEL_IMDB_ID = 'nm0000243';

const graphqlHTTP = require('express-graphql');
const {GraphQLSchema} = require('graphql');
const {queryType} = require('./graphql.js');



var app = Express();

    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));

    var database, collection;
    app.listen(9292, () => {
        MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
            if(error) {
                throw error;
            }
            database = client.db(DATABASE_NAME);
            collection = client.db("ListOfMovies").collection("Movie");
            console.log("Connected to `" + DATABASE_NAME + "`!");
            
        });
    });

    //Import data into mongoDB
    app.get("/movies/populate", (request, response) => {
        
        //data import into mongoDB
        //importation();
        collection.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });


    //Return the first must-watch movie
    //Implies metascore > 70

    app.get("/movies", (request, response) => {
        //function findOne()
        //https://docs.mongodb.com/manual/reference/method/db.collection.findOne/
        // $gt means > in mongodb
        collection.findOne({"metascore" : {"$gt" : 70}}, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result);
            //console.log("Value of request : " + request.params..id); //object
        });
    });


    //This function .get("/movies/search") must be above the .get("/movies/:identifiant")
    //because otherwise the argument after the second / will be recognize
    //as an :id 

    //We want to be able to make searches such as : http://localhost:9292/movies/search?limit=5&metascore=77
    app.get("/movies/search", (request, response) => {
        
        //Number of films we want to display
        //https://stackoverflow.com/questions/51798130/nodejs-express-best-practice-to-handle-optional-query-string-parameters-in-a
        
        var filmLimit = request.query.limit;
        if(filmLimit == null) filmLimit = 5; //Default parameter
        else{filmLimit = Number(request.query.limit)} //transfer into an object number in javascript
        
        var metascore = request.query.metascore;
        if(metascore==null)metascore=0; //Default parameter
        else{metascore = Number(request.query.metascore)}
        
        //console.log("value of filmLimit : " + filmLimit);
        //console.log("value of metascore : " + metascore);
        //Look for results according the searching parameters
        collection.find({"metascore": {"$gt": metascore} }).sort({metascore:-1}).limit(filmLimit).toArray((error, result) => {
            if(error) {
                return response.status(500).send("Error in request search : " + error);
            }
            response.send(result);
        });
        
       //response.send("beau gosse");
    });


    //We aim to get the id written in the url
    //First https://stackoverflow.com/questions/12160668/how-to-get-the-id-from-the-url-while-using-node-js
    //From the url above, I understood that from the request, there are some attributes available
    //So here we add a value "identifiant" that contains the id wanted

    //Exemple of ID : 
    app.get("/movies/:identifiant", (request, response) => {
        collection.findOne({ "id": request.params.identifiant}, (error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
    });

    //If you want to 
    app.post("/movies/:id", (request, response) => {
        req=request.body;
        collection.updateOne({id:request.params.id},{$set:{date:req.date,review:req.review}},(error, result) => {           
            if(error) {
                return response.status(500).send(error);
            }           
            response.send(result)          
        });
    });


const schema = new GraphQLSchema({ query: queryType });
//Setup the nodejs GraphQL server
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));


  

    


