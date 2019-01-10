const Query = require('./Query');
const Mutation = require('./Mutation');
const Subscription = require('./Subscription');
// Schemas
const User = require('./User');
const Vote = require('./Vote');
const Link = require('./Link');

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Vote,
    Link,
}

module.exports = resolvers;
