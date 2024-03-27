const User = require('../../models/user');

class userRepo {
    async create(body) {
        const newUser = new User({
            ...body,
        });

        return newUser.save();
    }

    async get(user_id) {
        return User.findOne({ user_id });
    }

    async getUserWithComments(
        user_id,
        limit,
        skip,
        sort,
        match
    ) {
        return User.findOne({ user_id }).populate({
            path: 'comments',
            match,
            options: {
                limit,
                skip,
                sort,
            }
        });
    }

    async addCommentForUser(user_id, newComment) {
        await User.findOneAndUpdate({ user_id } ,{ $push: { comments: newComment }});
    }
}

module.exports = new userRepo();