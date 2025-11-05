const { Router } = require('express');
const controller = require('../controllers/github.controller');

const router = Router();

router.get('/user/:username', controller.getUser);
router.get('/repos/:username', controller.getUserRepos);
router.get('/search/repositories', controller.searchRepositories);

module.exports = router;


