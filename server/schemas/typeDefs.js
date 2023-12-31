// imports the gql function from the appollo server express pacakge
const { gql } = require("apollo-server-express");

// defines the schema using the GraphQL schema language
// the schema describes the types, queries, mutations, and inputs available in the GraphQL api
const typeDefs = gql`
  type User {
    _id: ID
    email: String
    pets: [Pet]
  }

  type Pet {
    _id: ID!
    name: String
    age: Int
    gender: String
    speciesId: Species
    owner: User
  }

  type Need {
    _id: ID!
    needType: String!
    description: String!
  }

  type Species {
    _id: ID!
    speciesType: String!
    description: String!
    image: String!
    needs: [Need]
    alt: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    species: [Species]
  }

  input NeedInput {
    needType: String!
    description: String!
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPet(name: String!, speciesId: ID!, age: Int!, gender: String!): Pet
    updatePet(petID: ID!, name: String!): Pet
    deletePet(petID: ID!, userID: ID!): User
    addSpecies(
      speciesType: String!
      description: String!
      needs: [NeedInput!]
      image: String!
      alt: String!
    ): Species
  }
`;

module.exports = typeDefs;
