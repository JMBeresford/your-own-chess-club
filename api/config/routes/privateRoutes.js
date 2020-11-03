const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'GET /games': 'GameController.getAll',
  'POST /user/games': 'GameController.getUserGames',
  'PUT /games': 'GameController.updateGame',
};

module.exports = privateRoutes;
