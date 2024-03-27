const Comment = require('../../models/comment');

class commentRepo {
    async create(content) {
        const newComment = new Comment({
            content,
        });

        return newComment.save();
    }

    async get(comment_id) {
        return Comment.findOne({ comment_id }).select({ comment_id: 1, content: 1, likes: 1 });
    }

    async like(comment_id, voter_user_id) {
        return Comment.findOneAndUpdate({ comment_id } ,{ $addToSet: { likes: voter_user_id }});
    }

    async unlike(comment_id, voter_user_id) {
        return Comment.findOneAndUpdate({ comment_id } ,{ $pull: { likes: voter_user_id }});
    }
}

module.exports = new commentRepo();