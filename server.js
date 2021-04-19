const { getPlayer, setPlayer } = require('./player')
const { getRun, setRun } = require('./run')
const { GraphQLServer } = require('graphql-yoga')
const { getArgumentValues } = require('graphql/execution/values')
//forma de la informacion
const typeDefs = `
  type Query {
    playerInfo(nickname: String!): Player
    runInfo(id: Int!): Run
  },
  type Player{
    nickname: String!
    rank: String!
    email: String!
  },
  type Run{
    id: Int!
    player: Player
    points: Int!
    fruits: Int!
  },
  type Mutation {
    setPlayer(nickname: String!, rank: String!, email: String!): Player!
    setRun(id: Int!, player: String!, points: Int!, fruits: Int!): Run!
  }
`
//como manejarla
const resolvers = {
  Query: {
    playerInfo: (_, { nickname }) => getPlayer(nickname),
    runInfo: (_, { id }) => getRun(id)
  },
  Player: {
    nickname: player => player.value.nickname,
    rank: player => player.value.rank,
    email: player => player.value.email
  },
  Run: {
    id: run => run.value.id,
    player: run => getPlayer(run.value.player),
    points: run => run.value.points,
    fruits: run => run.value.fruits
  },
  Mutation: {
    setPlayer: (_, { nickname, rank, email }) => setPlayer(nickname, rank, email) ,
    setRun: (_, { id, player, points, fruits }) => setRun(id, player, points, fruits)
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => console.log('Server is running on localhost:4000'))

// // TBI
// var express = require('express');
// var { graphqlHTTP } = require('express-graphql');
// var { buildSchema } = require('graphql');
 
// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);
 
// // The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };
 
// var app = express();
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
// app.listen(4000);
// console.log('Running a GraphQL API server at http://localhost:4000/graphql');