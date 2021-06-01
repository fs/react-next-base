export default [
  {
    message: 'Invalid credentials',
    locations: [{ line: 2, column: 3 }],
    path: ['employee'],
    extensions: {
      detail: null,
      status: 401,
      code: 'unauthorized',
    },
  },
];
