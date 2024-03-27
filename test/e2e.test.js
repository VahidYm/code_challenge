const Axios = require('axios');
const App = require('../app');
const app = new App();
const server = app.server;
const userRepo = require('../api/user/user.repo');
const commentRepo = require('../api/comment/comment.repo');

let user_1_id;
let comment_1_id;

const axios = Axios.create({
  baseURL: `http://127.0.0.1:3031`,
});

beforeAll(async () => {
  await server.listen({ port: 3031 });

  // Create fake user_1
  const user_1 = await userRepo.create({
    name: 'Elvis',
  });

  user_1_id = user_1.user_id;

  // Create fake comment_1
  const comment_1 = await commentRepo.create('Content 1');
  await userRepo.addCommentForUser(user_1_id, comment_1);

  comment_1_id = comment_1.comment_id;

  // Create fake comment_2
  const comment_2 = await commentRepo.create('Content 2');
  await userRepo.addCommentForUser(user_1_id, comment_2);
});

afterAll(async () => {
  await app.server.close();
});

// jest.setTimeout(30000);

///////////////////////////////////////////////////////////  Profile Test
describe('post: / - e2e', () => {
  it('should create a new profile and return the profile_id', async () => {
    await axios
      .post(`/`, {
        name: 'A Martinez X',
        description: 'Adolph Larrue Martinez III.',
        mbti: 'ISFJ',
        enneagram: '9w3',
        variant: 'sp/so',
        tritype: 725,
        socionics: 'SEE',
        sloan: 'RCOEN',
        psyche: 'FEVL'
      })
      .then(function (response) {
        expect(response.status).toBe(200);
        expect(response.data.profile_id).toBeGreaterThanOrEqual(1);
      });
  });
  it('should throw an error (The name should be a string)', async () => {
    await axios
      .post(`/`, {
        name: 456,
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.name).toBe('The name should be a string');
      });
  });
  it('should throw an error (The length of the name should be between 3 and 100 characters)', async () => {
    await axios
      .post(`/`, {
        name: 'ab',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.name).toBe('The length of the name should be between 3 and 100 characters');
      });
  });
  it('should throw an error (The description should be a string)', async () => {
    await axios
      .post(`/`, {
        description: 112233445566,
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.description).toBe('The description should be a string');
      });
  });
  it('should throw an error (The length of the description should be between 10 and 1000 characters)', async () => {
    await axios
      .post(`/`, {
        description: 'desc',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.description).toBe('The length of the description should be between 10 and 1000 characters');
      });
  });
  it('should throw an error (The MBTI type is not valid)', async () => {
    await axios
      .post(`/`, {
        mbti: 'RRRR',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.mbti).toBe('The MBTI type is not valid');
      });
  });
  it('should throw an error (The length of the enneagram should be 3 characters)', async () => {
    await axios
      .post(`/`, {
        enneagram: 'ddddd',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.enneagram).toBe('The length of the enneagram should be 3 characters');
      });
  });
  it('should throw an error (The length of the variant should be between 2 and 5 characters', async () => {
    await axios
      .post(`/`, {
        variant: 'vvvvvv',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.variant).toBe('The length of the variant should be between 2 and 5 characters');
      });
  });
  it('should throw an error (The tritype must be a 3-digit number.', async () => {
    await axios
      .post(`/`, {
        tritype: 123456,
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.tritype).toBe('The tritype must be a 3-digit number.');
      });
  });
  it('should throw an error (The socionics type is not valid)', async () => {
    await axios
      .post(`/`, {
        socionics: 'LLL',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.socionics).toBe('The socionics type is not valid');
      });
  });
  it('should throw an error (The length of the sloan should be 5 characters', async () => {
    await axios
      .post(`/`, {
        sloan: 'SSSSSS',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.sloan).toBe('The length of the sloan should be 5 characters');
      });
  });
  it('should throw an error (The psyche type is not valid)', async () => {
    await axios
      .post(`/`, {
        psyche: 'EEEE',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.psyche).toBe('The psyche type is not valid');
      });
  });
});

describe("get: /:profile_id - e2e", () => {
  it("should throw an error (Profile not found)", async () => {
    await axios
      .get(`/3`)
      .catch((error) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('Profile not found');
      });
  });
});

//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////  User Test
describe('post: /user - e2e', () => {
  it('should create a new user and return the user_id', async () => {
    await axios
      .post(`/user`, {
        name: 'Andrew',
      })
      .then(function (response) {
        expect(response.status).toBe(200);
        expect(response.data.user_id).toBeGreaterThanOrEqual(1);
      });
  });
  it('should throw an error (The name should be a string)', async () => {
    await axios
      .post(`/user`, {
        name: 456,
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.name).toBe('The name should be a string');
      });
  });
  it('should throw an error (The length of the name should be between 3 and 100 characters)', async () => {
    await axios
      .post(`/user`, {
        name: 'ab',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.name).toBe('The length of the name should be between 3 and 100 characters');
      });
  });
});

describe("get: /user/:user_id - e2e", () => {
  it("should return the user", async () => {
    await axios
      .get(`/user/${user_1_id}`)
      .then(function (response) {
        expect(response.status).toBe(200);
        expect(response.data.user_id).toBe(user_1_id);
        expect(response.data.name).toBe('Elvis');
    });
  });

  it("should throw an error (User not found)", async () => {
    await axios
      .get(`/user/3`)
      .catch((error) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('User not found');
      });
  });
});

//////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////  Comment Test
describe('post: /comment - e2e', () => {
  it('should create a new comment and return the comment_id', async () => {
    await axios
      .post(`/comment`, {
        content: 'So Fantastic',
        user_id: user_1_id
      })
      .then(function (response) {
        expect(response.status).toBe(200);
        expect(response.data.comment_id).toBeGreaterThanOrEqual(1);
      });
  });
  it('should throw an error (The comment should be a string)', async () => {
    await axios
      .post(`/comment`, {
        content: 456,
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.content).toBe('The comment should be a string');
      });
  });
  it('should throw an error (The length of the comment should be between 2 and 500 characters)', async () => {
    await axios
      .post(`/comment`, {
        content: 'a',
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.content).toBe('The length of the comment should be between 2 and 500 characters');
      });
  });
});

describe("get: /comment/:comment_id - e2e", () => {
  it("should return the comment", async () => {
    await axios
      .get(`/comment/${comment_1_id}`)
      .then(function (response) {
        expect(response.status).toBe(200);
        expect(response.data.comment_id).toBe(comment_1_id);
        expect(response.data.content).toBe('Content 1');
        expect(response.data.likes).toBeGreaterThanOrEqual(0);
    });
  });

  it("should throw an error (Comment not found)", async () => {
    await axios
      .get(`/comment/10`)
      .catch((error) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('Comment not found');
      });
  });
});

describe('post: /comment/like/:comment_id - e2e', () => {
  it('should like the comment', async () => {
    await axios
      .patch(`/comment/like/${comment_1_id}`, {
        voter_user_id: user_1_id
      })
      .then(function (response) {
        expect(response.status).toBe(200);
      });
  });
  it('should throw an error (The voter_user_id must be bigger than 1)', async () => {
    await axios
      .patch(`/comment/like/${comment_1_id}`, {
        voter_user_id: -4,
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.voter_user_id).toBe('The voter_user_id must be bigger than 1');
      });
  });
  it('should throw an error (Comment not found)', async () => {
    await axios
      .patch(`/comment/like/555`, {
        voter_user_id: user_1_id,
      })
      .catch((error) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('Comment not found');
      });
  });
});

describe('post: /comment/unlike/:comment_id - e2e', () => {
  it('should unlike the comment', async () => {
    await axios
      .patch(`/comment/unlike/${comment_1_id}`, {
        voter_user_id: user_1_id
      })
      .then(function (response) {
        expect(response.status).toBe(200);
      });
  });
  it('should throw an error (The voter_user_id must be bigger than 1)', async () => {
    await axios
      .patch(`/comment/unlike/${comment_1_id}`, {
        voter_user_id: -4,
      })
      .catch((error) => {
        expect(error.response.status).toBe(400);
        expect(error.response.data.error.voter_user_id).toBe('The voter_user_id must be bigger than 1');
      });
  });
  it('should throw an error (Comment not found)', async () => {
    await axios
      .patch(`/comment/unlike/555`, {
        voter_user_id: user_1_id,
      })
      .catch((error) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('Comment not found');
      });
  });
});

describe("get: /comment/user/:user_id - e2e", () => {
  it("should return the user and the account comments", async () => {
    await axios
      .get(`/comment/user/${user_1_id}?sortBy=createdAt:asc&limit=5&page=1&filter=Content`)
      .then(function (response) {
        expect(response.status).toBe(200);
        expect(response.data.user_id).toBe(user_1_id);
        expect(response.data.name).toBe('Elvis');
        expect(response.data).toEqual(
          expect.objectContaining({ comments: expect.any(Array) })
        );
    });
  });

  it("should throw an error (User not found)", async () => {
    await axios
      .get(`/comment/user/10`)
      .catch((error) => {
        expect(error.response.status).toBe(404);
        expect(error.response.data.error).toBe('User not found');
      });
  });
});

//////////////////////////////////////////////////////////////////////////////////////