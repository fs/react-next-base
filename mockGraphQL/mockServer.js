import { makeExecutableSchema, mockServer } from 'graphql-tools';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const mocks = {};
const preserveResolvers = true;

const server = mockServer(executableSchema, mocks, preserveResolvers);

const query = `{ __typename }`;
const variables = {};

server
  .query(query, variables)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

export default executableSchema;
