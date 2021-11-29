const graphql = require('graphql');
const axios = require('axios').default;

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const urlAPI = 'http://localhost:3000/';

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      // eslint-disable-next-line no-use-before-define
      type: new GraphQLList(UserType),
      resolve: ({ id }) => axios.get(`${urlAPI}companies/${id}/users`).then(({ data }) => data),

    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: ({ companyId }) => axios.get(`${urlAPI}companies/${companyId}`).then(({ data }) => data),
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => axios.get(`${urlAPI}users/${id}`).then(({ data }) => data),
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => axios.get(`${urlAPI}companies/${id}`).then(({ data }) => data),
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve: (_, { firstName, age }) => axios.post(`${urlAPI}users`, { firstName, age }).then(({ data }) => data),
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { id }) => axios.delete(`${urlAPI}users/${id}`).then(({ data }) => data),
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve: (_, {
        id, firstName, age, companyId,
      }) => axios.patch(`${urlAPI}users/${id}`, { firstName, age, companyId }).then(({ data }) => data),
    },
  },
});

const schema = new GraphQLSchema({ query: RootQuery, mutation });

module.exports = schema;
