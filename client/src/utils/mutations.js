import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_SPECIES = gql`
  mutation addSpecies(
    $speciesType: String!
    $description: String!
    $image: String!
    $alt: String!
    $needs: [NeedInput!]!
  ) {
    addSpecies(
      speciesType: $speciesType
      description: $description
      image: $image
      alt: $alt
      needs: $needs
    ) {
      _id
      speciesType
      description
      image
      alt
      needs {
        _id
        needType
        description
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const UPDATE_PET = gql`
  mutation updatePet($petId: ID!, $name: String!) {
    updatePet(petID: $petId, name: $name) {
      _id
      name
      age
      gender
      speciesId {
        _id
        speciesType
        description
        image
        alt
        needs {
          _id
          needType
          description
        }
      }
    }
  }
`;

export const DELETE_PET = gql`
  mutation deletePet($petId: ID!, $userId: ID!) {
    deletePet(petID: $petId, userID: $userId) {
      _id
      email
      pets {
        _id
        name
        age
        gender
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation AddPet(
    $name: String!
    $speciesId: ID!
    $age: Int!
    $gender: String!
  ) {
    addPet(name: $name, speciesId: $speciesId, age: $age, gender: $gender) {
      _id
      age
      gender
      name
    }
  }
`;
