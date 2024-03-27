const commentRepo = require('./comment.repo');
const userRepo = require('./../user/user.repo');
const validator = require('../../validators')
const { errorGenerator} = require('../../helpers/error');

class commentController {
  async newComment(req, res, next) {
    try {
      await validator.validationData(req);
      const user_id = req.body.user_id;
      const user = await userRepo.get(user_id);
      if (!user) throw new errorGenerator("User not found", 404);
      const newComment = await commentRepo.create(req.body.content);
      await userRepo.addCommentForUser(user_id, newComment);
      
      res.status(200).json({
        comment_id: newComment.comment_id,
      });
    } catch (err) {
      next(err)
    }
  }

  async getComment(req, res, next) {
    try {
      const comment = await commentRepo.get(req.params.comment_id);
      if (!comment) throw new errorGenerator("Comment not found", 404);

      res.status(200).json({
        comment_id: comment.comment_id,
        content: comment.content,
        likes: comment.likes.length,
      });
    } catch (err) {
      next(err)
    }
  }

  async getUserComments(req, res, next) {
    try {
      const limit = req.query.limit > 0 ? req.query.limit : 5;
      const page = req.query.page > 0 ? req.query.page : 1;
      const skip = (page - 1) * limit;
      const sort = {}
      const match = {}

      if (req.query.sortBy){
        const parts =  req.query.sortBy?.split(':')
        sort[parts[0]] = parts[1] === 'desc'? -1: 1;
      }

      if (req.query.filter){
        match.content = { "$regex": req.query.filter };
      }

      const userComments = await userRepo.getUserWithComments(
        req.params.user_id,
        limit,
        skip,
        sort,
        match
      );
      if (!userComments) throw new errorGenerator("User not found", 404);

      const result = {
        user_id: userComments.user_id,
        name: userComments.name,
        comments: userComments.comments.map((i) => ({
          comment_id: i.comment_id,
          content: i.content,
          likes: i.likes.length,
        })),
      }

      res.status(200).json(result);
    } catch (err) {
      next(err)
    }
  }

  async like(req, res, next) {
    try {
      await validator.validationData(req);
      const voter_user = await userRepo.get(req.body.voter_user_id);
      if (!voter_user)throw new errorGenerator("User not found", 404);
      await commentRepo.like(req.params.comment_id, voter_user.id);
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err)
    }
  }

  async unlike(req, res, next) {
    try {
      await validator.validationData(req);
      const voter_user = await userRepo.get(req.body.voter_user_id);
      if (!voter_user) throw new errorGenerator("User not found", 404);
      await commentRepo.unlike(req.params.comment_id, voter_user.id);
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new commentController();