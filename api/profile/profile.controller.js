const profileRepo = require('./profile.repo');
const { errorGenerator} = require('../../helpers/error');
const validator = require('../../validators')

class profileController {
    async newProfile(req, res, next) {
      try {
        await validator.validationData(req);
        const profile = await profileRepo.create(req.body);
        res.status(200).json({
            profile_id: profile.profile_id,
        });
      } catch (err) {
        next(err)
      }
    }
    async getProfile(req, res, next) {
      try {
        const profile = await profileRepo.get(+req.params.profile_id || 1);
        if (!profile)throw new errorGenerator("Profile not found", 404);

        res.render('profile_template', {
          profile,
        });
      } catch (err) {
        next(err)
      }
    }
}

module.exports = new profileController();