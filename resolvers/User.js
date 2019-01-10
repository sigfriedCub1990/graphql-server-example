const User = {
    links: (parent, args, context) => context.prisma.user({ id: parent.id }).links(),
    votes: (parent, args, context) => context.prisma.user({ id: parent.id }).votes(),
};

module.exports = User;