const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    pets: [Pet]
  }

  type Pet {
    petID: ID!
    name: String
    age: Int
    gender: String
    species: Species
    needs: [Need]
    owner: User
  }

  type Need {
    needID: ID!
    needType: String
    description: String
    fulfilled: Boolean
  }

  type Species {
    speciesID: ID!
    speciesType: String
    description: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(_id: ID!): User
    pet(petID: ID!): Pet
    species: [Species]
    needs: [Need]
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPet(
      name: String!
      species: ID!
      age: Int!
      gender: String!
      owner: ID!
    ): Pet
    updatePet(petID: ID!, name: String!): Pet
    deletePet(petID: ID!): User
  }
`;

module.exports = typeDefs;
