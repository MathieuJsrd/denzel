const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQL
    

} = require('graphql');
const _ = require('lodash');

//Define the Query
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,

            resolve: function () {
                return "Hello World";
            }
        },

        movie : {
            type:GraphQLString,

            resolve: function(){
                
                return "yes";
            }
        },
        
    }
});

exports.queryType = queryType;