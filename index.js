const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL.graphqlHTTP({
  graphiql: true,
  schema,

}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}!`);
});
