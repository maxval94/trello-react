import gql from "graphql-tag";

// User
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

// Card
const addCard = gql`
  mutation addCard($input: AddCard!) {
    addCard(input: $input) {
      title
    }
  }
`;
const updateCard = gql`
  mutation updateCard($input: UpdateCard!) {
    updateCard(input: $input) {
      title
    }
  }
`;

export { createUser, loginUser, addCard, updateCard };
