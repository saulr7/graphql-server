const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL.graphqlHTTP({
  graphiql: true,
  schema,

}));

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App listening on port 3000!');
});
