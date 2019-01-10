const jwt = require('jwt-simple');

function getUserID(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '');

        const { userId } = jwt.decode(token, config.APP_SECRET);

        return userId;
    }

    throw new Error('Not authorized');
}

module.exports = {
    getUserID
};
