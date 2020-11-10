const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'GET /games': 'GameController.getAll',
  'GET /user': 'UserController.getUser',
  'GET /user/games': 'GameController.getUserGames',
  'PUT /games': 'GameController.updateGame',
  'POST /game': 'GameController.createGame',
};

module.exports = privateRoutes;
