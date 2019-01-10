const Subscription = {
    newLink: {
        subscribe: (parent, args, context) => {
            return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
        },
        resolve: payload => payload
    },
    newVote: {
        subscribe: (parent, args, context) => {
            return context.prisma.$subscribe.vote({ mutation_in: ['CREATE'] }).node();
        },
        resolve: payload => payload
    }
};

module.exports = Subscription;
