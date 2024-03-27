const Profile = require('../models/profile');

class seedDB {
    constructor() {
      this.addDefaultProfile();
    }

    async addDefaultProfile() {
      const defaultProfile = {
          'name': 'A Martinez',
          'description': 'Adolph Larrue Martinez III.',
          'mbti': 'ISFJ',
          'enneagram': '9w3',
          'variant': 'sp/so',
          'tritype': 725,
          'socionics': 'SEE',
          'sloan': 'RCOEN',
          'psyche': 'FEVL',
          'image': 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I',
        };

        const newProfile = new Profile({
            ...defaultProfile,
        });

        return newProfile.save();
    }
}

module.exports = {
  seedDB,
}