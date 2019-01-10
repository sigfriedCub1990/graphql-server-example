const Query = {
    posts: async (root, args, context, info) => {
        const links = await context.prisma.links({ 
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
        });

        const count = await context.prisma.linksConnection().aggregate().count();

        return {
            count,
            posts: links,
        };
    },
    link: (root, args, context) => context.prisma.link({ id: args.id }),
    users: (root, args, context) => context.prisma.users(),
    votes: (root, args, context) => context.prisma.votes(),
};

module.exports = Query;
