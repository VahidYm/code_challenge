const Profile = require('../../models/profile');

class profileRepo {
    async create(body) {
        const newProfile = new Profile({
            ...body,
        });

        return newProfile.save();
    }

    async get(profile_id) {
        return Profile.findOne({ profile_id });
    }
}

module.exports = new profileRepo();