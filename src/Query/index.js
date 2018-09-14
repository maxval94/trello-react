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
        id
        name
        users {
          id
          email
        }
        lists {
          id
          title
          cards {
            id
            title
            description
            label
          }
        }
      }
    }
  }
`;

const getBoard = gql`
  query GetBoard($id: String!) {
    getBoard(id: $id) {
      id
      name
      users {
        id
        email
      }
      lists {
        id
        title
        cards {
          id
          title
          description
          label
        }
      }
    }
  }
`;

const getList = gql`
  query GetList($id: String!) {
    getList(id: $id) {
      title
      cards {
        id
        title
      }
    }
  }
`;

const getCard = gql`
  query GetCard($id: String!) {
    getCard(id: $id) {
      title
      description
      label
    }
  }
`;

export { logout, getUser, getBoard, getList, getCard };
