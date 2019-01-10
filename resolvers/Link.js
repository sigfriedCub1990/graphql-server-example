const Link = {
    postedBy: (parent, args, context) => context.prisma.link({ id: parent.id }).postedBy(),
    votes: (parent, args, context) => context.prisma.link({ id: parent.id }).votes(),
};

module.exports = Link;