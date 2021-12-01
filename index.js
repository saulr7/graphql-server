const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const { graphqlHTTP } = expressGraphQL;

const app = express();

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: { uid: 'jyklapsd1o33c', data: req.headers },
  })),
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}!`);
});
