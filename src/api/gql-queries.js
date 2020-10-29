import { gql } from '@apollo/client'

export const GET_CITY_BY_NAME = gql`
  query GetCityByName($query: String = "language:Javascript") {
    getCityByName(name: REPOSITORY, query: $query, first: 10) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          id
          nameWithOwner
          description
          viewerHasStarred
        }
      }
    }
  }
`

export const STAR_REPOSITORY = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`

export const REMOVE_STAR_REPOSITORY = gql`
  mutation AddStar($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`
