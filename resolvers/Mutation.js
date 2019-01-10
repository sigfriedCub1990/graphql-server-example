const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const jwt = require('jwt-simple');

const { getUserID } = require('../utils/utils');

const Mutation = {
    post: (root, args, context, info) => {
        const userId = getUserID(context);
        return context.prisma.createLink({
            url: args.url,
            description: args.description,
            // https://www.prisma.io/docs/-rsc6#nested-object-writes
            postedBy: { connect: { id: userId }},
        });
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
    },

    signup: async (root, args, context, info) => {
        const password = hash.update(args.password).digest('hex');
        const user = await context.prisma.createUser({ ...args, password });
        const token = jwt.encode({ userId: user.id }, config.APP_SECRET);

        return {
            user,
            token
        };
    },

    login: async (root, args, context, info) => {
        const user = await context.prisma.user({ email: args.email });
        if (!user) {
            throw new Error(`User doesn't exist.`);
        }

        const password = hash.update(user.password).digest('hex')
        if (password === user.password) {
            throw new Error(`User or password incorrect.`);
        }

        const token = jwt.encode({ userId: user.id}, config.APP_SECRET);

        return {
            user,
            token
        };
    },

    vote: async (root, args, context) => {
        const userId = getUserID(context);

        const linkExists = await context.prisma.$exists.vote({
            link: { id: args.linkID },
            user: { id: userId }
        });
        if (linkExists) {
            throw new Error(`Post already voted`);
        }

        return context.prisma.createVote({
            user: { connect: { id: userId } },
            link: { connect: { id: args.linkID } }
        });
    },
};

module.exports = Mutation;
