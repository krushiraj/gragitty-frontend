import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      name
      username
      email
      profilePic
      gitProfile
      createdAt
    }
  }
`;

export const GET_CURRENT_USER__USERNAME_PROPIC = gql`
  {
    currentUser {
      name
      profilePic
    }
  }
`;
