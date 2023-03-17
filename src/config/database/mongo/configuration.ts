export function config(): any {
  return {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   reconnectTries: Number.MAX_VALUE,
      //   reconnectInterval: 500,
      connectTimeoutMS: 10000,
      ssl: false,
    },
    url: process.env.CONNECTION_MONGO_STRING || 'mongodb://localhost:27017/test-graphql',
  };
}
