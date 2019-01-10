const Vote = {
    user: (parent, args, context) => context.prisma.vote({ id: parent.id }).user(),
    link: (parent, args, context) => context.prisma.vote({ id: parent.id }).link()
};

module.exports = Vote;