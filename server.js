const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLNonNull, graphql } = require('graphql');

// Construct a schema, using GraphQL schema language
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		name: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
	},
});

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		getUser: {
			type: UserType,
			args: { name: { type: new GraphQLNonNull(GraphQLString) } },
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'MutationType',
	fields: {
		createUser: {
			type: UserType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
			},
		},
	},
});

const schema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
	getUser: ({ name }) => {
		//get user from DB
		const password = '0000';
		return { name, password };
	},
	createUser: ({ name, password }) => {
		//create the user in DB
		return { name, password };
	},
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
	schema,
	source: 'mutation { createUser(name:"NewUsers", password:"0000") {name} }',
	rootValue,
}).then((response) => {
	console.log(response);
});
