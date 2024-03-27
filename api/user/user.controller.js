const userRepo = require('./user.repo');
const { errorGenerator} = require('../../helpers/error');
const validator = require('../../validators')
class userController {
    async newUser(req, res, next) {
      try {
        await validator.validationData(req);
        const user = await userRepo.create(req.body);
        res.status(200).json({
          user_id: user.user_id,
        });
      } catch (err) {
        next(err)
      }
    }
    async getUser(req, res, next) {
      try {
        const user = await userRepo.get(req.params.user_id);
        if (!user)throw new errorGenerator("User not found", 404);

        res.status(200).json({
          user_id: user.user_id,
          name: user.name,
        });
      } catch (err) {
        next(err)
      }
    }
}

module.exports = new userController();