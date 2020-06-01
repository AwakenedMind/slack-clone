import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import models from './models/index';
import express from 'express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
require('dotenv').config();

// Create the express server
const app = express();

const SECRET = process.env.JWT_SECRET;
const SECRET2 = process.env.JWT_SECRET2;

// Merge type defs and resolvers
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
	fileLoader(path.join(__dirname, './resolvers'))
);

// Combine resolvers and type definitions into a schema
export const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	cors: true,
	playground: true,
	context: {
		models,
		SECRET,
		SECRET2,
	},
});

// Apply express middleware to Apollo Server
server.applyMiddleware({ app });

// Sync local postgresql db & start app in localhost:8081
models.sequelize
	.sync()
	.then(() =>
		app.listen({ port: 8000 }, () =>
			console.log(`🚀 Server ready at http://localhost:8000/graphql`)
		)
	);
