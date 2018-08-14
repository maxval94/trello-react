import gql from "graphql-tag";

const logout = gql`
  {
    logout {
      data
    }
  }
`;

const getUser = gql`
  {
    getUser {
      email
      boards {
        name
        users {
          email
        }
        lists {
          title
          cards {
            title
            description
            label
          }
        }
      }
    }
  }
`;

export { logout, getUser };
