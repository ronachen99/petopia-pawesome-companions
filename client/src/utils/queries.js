import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query getUser {
    user {
      _id
      email
      pets {
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
  }
`;

export const QUERY_SPECIES = gql`
  query getSpecies {
    species {
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
