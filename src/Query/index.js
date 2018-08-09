import gql from "graphql-tag";

const logout = gql`
  {
    logout {
      data
    }
  }
`;

export { logout };
