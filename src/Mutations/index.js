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

// Board
const updateBoard = gql`
  mutation updateBoard($input: UpdateBoard!) {
    updateBoard(input: $input) {
      name
    }
  }
`;
const addUser = gql`
  mutation addUser($input: AddUser!) {
    addUser(input: $input) {
      name
    }
  }
`;

const addList = gql`
  mutation addList($input: AddList!) {
    addList(input: $input) {
      name
      lists {
        id
        title
        cards {
          id
          title
        }
      }
    }
  }
`;

// List
const updateList = gql`
  mutation updateList($input: UpdateList!) {
    updateList(input: $input) {
      title
    }
  }
`;
const deleteList = gql`
  mutation deleteList($input: DeleteList!) {
    deleteList(input: $input) {
      id
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
  updateBoard,
  addUser,
  addList,
  updateList,
  deleteList,
  addCard,
  updateCard,
  deleteCard
};
