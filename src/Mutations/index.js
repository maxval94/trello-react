import gql from "graphql-tag";

const createUser = gql`
  mutation createUser($input: CreateUser!) {
    createUser(input: $input) {
      email
    }
  }
`;
const loginUser = gql`
  mutation login($input: Login!) {
    login(input: $input) {
      email
    }
  }
`;

export { createUser, loginUser };
