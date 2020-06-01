const users = [
  { id: 1, email: 'ivan@mail.test' },
  { id: 2, email: 'john@example.com' },
  { id: 3, email: 'testUser@example.com' },
];

// for show relationship between types
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL' },
  { id: 2, authorId: 2, title: 'Welcome to Meteor' },
  { id: 3, authorId: 2, title: 'Advanced GraphQL' },
  { id: 4, authorId: 3, title: 'Launchpad is Cool' },
];

const resolvers = {
  Query: {
    me: ({ id }) => users.find(user => user.id === id),
  },

  Mutation: {
    registerUser: ({ login, password }) => {
      if (!login || !password) {
        throw new Error('You have the wrong login or password');
      }
      const updatedUsers = users;
      updatedUsers.push({ id: users.slice(-1)[0].id + 1, email: login });
      return updatedUsers;
    },
  },

  /* User: {
    posts: user => posts.filter(post => post.authorId === user.id),
  },

  Post: {
    author: post => users.find(user => user.id === post.authorId),
  },*/
};

export default resolvers;
