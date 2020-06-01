const typeDefs = `
  type User {
    id: Int!
    email: String!
  }

  type Post {
    id: Int!
    title: String!
  }

  # the schema allows the following query:
  type Query {
    me(id: Int!): User
  }

  # this schema allows the following mutation:
  type Mutation {
    registerUser (
      login: String!
      password: String!
    ): User
  }
`;

export default typeDefs;
