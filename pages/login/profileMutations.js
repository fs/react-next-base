import gql from 'graphql-tag';

export default {
  REGISTRATION: gql`
    mutation registerUser($login: String!, $password: String!) {
      registerUser(login: $login, password: $password) {
        user {
          id
          email
        }
      }
    }
  `,
};
