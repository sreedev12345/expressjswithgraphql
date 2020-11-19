const { buildSchema } = require('graphql');

var graphqlSchema = buildSchema(`
  type User {
  	username : String,
  	id : ID
  }
  type Query {
    users:[User]
  }
  type Mutation {
  	createUser(username:String!):User
  	updateUser(id:ID,username:String):User
  }
`);

module.exports = graphqlSchema