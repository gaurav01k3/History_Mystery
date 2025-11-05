const github = require('../services/github-integrator');

function relayAxiosResponse(res, axiosResponse) {
  const status = axiosResponse.status || 500;
  const data = axiosResponse.data;
  res.status(status).json(data);
}

async function getUser(req, res, next) {
  try {
    const { username } = req.params;
    const response = await github.fetchUser(username);
    relayAxiosResponse(res, response);
  } catch (err) {
    next(err);
  }
}

async function getUserRepos(req, res, next) {
  try {
    const { username } = req.params;
    const { page, per_page: perPage, sort, direction } = req.query;
    const response = await github.fetchUserRepos(username, { page, perPage, sort, direction });
    relayAxiosResponse(res, response);
  } catch (err) {
    next(err);
  }
}

async function searchRepositories(req, res, next) {
  try {
    const { q, page, per_page: perPage, sort, order } = req.query;
    if (!q || String(q).trim() === '') {
      return res.status(400).json({ error: 'Missing required query param: q' });
    }
    const response = await github.searchRepositories(q, { page, perPage, sort, order });
    relayAxiosResponse(res, response);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUser,
  getUserRepos,
  searchRepositories,
};


