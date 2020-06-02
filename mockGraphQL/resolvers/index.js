import users from '../mocks/users';

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
