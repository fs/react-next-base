import gql from 'graphql-tag';

export default {
  SIGNUP: gql`
    mutation signup($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        me {
          id
          email
        }
      }
    }
  `,
};
