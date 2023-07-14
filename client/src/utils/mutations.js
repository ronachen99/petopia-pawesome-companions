import { gql } from '@apollo/client';

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
  mutation Mutation(
    $speciesType: String!
    $description: String!
    $needs: [NeedInput!]!
  ) {
    addSpecies(
      speciesType: $speciesType
      description: $description
      needs: $needs
    ) {
      _id
      speciesType
      description
      needs {
        _id
        needType
        description
      }
    }
  }
`;
