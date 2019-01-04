const { GraphQLServer } = require('graphql-yoga');

const links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => 'This value will be returned',
        feed: () => links,
        link: (parent, args) => links.filter(el => el.id === args.id)[0],
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            };
            links.push(link);
            return link;
        },

        updateLink: (parent, args) => {
            const link = links.filter(el => el.id === args.id)[0];
            if (link) {
                const updatedLink = {
                    description: args.description,
                    url: args.url
                };
                Object.assign(link, updatedLink);
                return link;
            } else {
                return null;
            }
        },

        deleteLink: (parent, args) => {
            const index = links.findIndex(el => el.id === args.id);
            if (index !== -1 ) {
                const link = links[index];
                links.splice(index, 1);
                return link;
            } else {
                return null;
            }
        }
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },
}

const server = new GraphQLServer({
    typeDefs: './schemas/schemas.graphql',
    resolvers,
});

server.start(() => console.log(`Server running on http://localhost:4000`));
