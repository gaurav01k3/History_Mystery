const axios = require('axios');

function buildHeaders() {
  const headers = {
    'User-Agent': 'history-mystery-server',
    'Accept': 'application/vnd.github+json',
  };
  if (process.env.GITHUB_TOKEN && String(process.env.GITHUB_TOKEN).trim() !== '') {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: buildHeaders(),
  validateStatus: () => true,
});

async function fetchUser(username) {
  return await api.get(`/users/${encodeURIComponent(username)}`);
}

async function fetchUserRepos(username, options = {}) {
  const params = {
    per_page: Number(options.perPage) || 30,
    page: Number(options.page) || 1,
    sort: options.sort || 'updated',
    direction: options.direction || 'desc',
  };
  return await api.get(`/users/${encodeURIComponent(username)}/repos`, { params });
}

async function searchRepositories(query, options = {}) {
  const params = {
    q: query,
    per_page: Number(options.perPage) || 10,
    page: Number(options.page) || 1,
    sort: options.sort,
    order: options.order,
  };
  return await api.get('/search/repositories', { params });
}

module.exports = {
  fetchUser,
  fetchUserRepos,
  searchRepositories,
};


