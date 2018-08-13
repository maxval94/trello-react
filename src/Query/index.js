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
    }
  }
`;

export { logout, getUser };
