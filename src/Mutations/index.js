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

// List
const addList = gql`
  mutation addList($input: AddList!) {
    addList(input: $input) {
      title
    }
  }
`;
const updateList = gql`
  mutation updateList($input: UpdateList!) {
    updateList(input: $input) {
      title
    }
  }
`;

// Card
const addCard = gql`
  mutation addCard($input: AddCard!) {
    addCard(input: $input) {
      title
      cards {
        id
        title
      }
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
const deleteCard = gql`
  mutation deleteCard($input: DeleteCard!) {
    deleteCard(input: $input) {
      id
    }
  }
`;

export {
  createUser,
  loginUser,
  addList,
  updateList,
  addCard,
  updateCard,
  deleteCard
};
