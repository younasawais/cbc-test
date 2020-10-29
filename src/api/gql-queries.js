import { gql } from "@apollo/client";

export const GET_CITY_BY_NAME = gql`
  query GetCityByName(
    $name: String! = "Toronto"
    $country: String
    $config: ConfigInput
  ) {
    getCityByName(name: $name, country: $country, config: $config) {
      name
      country
      weather {
        temperature {
          actual
        }
      }
    }
  }
`;
