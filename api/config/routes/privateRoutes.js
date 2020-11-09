const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'GET /games': 'GameController.getAll',
  'GET /user': 'UserController.getUser',
  'POST /user/games': 'GameController.getUserGames',
  'PUT /games': 'GameController.updateGame',
};

module.exports = privateRoutes;
