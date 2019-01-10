const config = require('./config.json');

const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./prisma/generated/prisma-client/index');

const resolvers = require('./resolvers');

const server = new GraphQLServer({
    typeDefs: './schemas/schemas.graphql',
    resolvers,
    context: (request) => {
        return {
            ...request,
            prisma,
        }
    }
});

global.config = config;

server.start(() => console.log(`Server running on http://localhost:4000`));
