import { makeExecutableSchema, mockServer } from 'graphql-tools';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
// This can be an SDL schema string (eg the result of `buildClientSchema` above)
// or a GraphQLSchema object (eg the result of `buildSchema` from `graphql`)
// schema

export const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const mocks = {};
const preserveResolvers = false;

const server = mockServer(executableSchema, mocks, preserveResolvers);

const query = `{ __typename }`;
const variables = {};

server.query(query, variables).then(response => {
  console.log(response);
});
