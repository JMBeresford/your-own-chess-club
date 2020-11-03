const Game = require('../models/Game');

const GameController = () => {
  const create = async (req, res) => {
    const { body } = req;

    try {
      const game = await Game.build({
        playerWhite: body.playerWhite,
        playerBlack: body.playerBlack,
      });

      return res.status(200).json({ game });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const updateGame = async (req, res) => {
    const {
      id, fens, gameOver, winner,
    } = req.body;

    try {
      const game = await Game.findAll({ where: { id } });

      if (!game) {
        return res.status(400).json({ msg: 'Bad Request: Game not found' });
      }

      const updatedGame = await game.update({
        fens, gameOver, winner,
      });

      return res.status(200).json({ updatedGame });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getUserGames = async (req, res) => {
    const { id } = req.body;

    try {
      const games = await Game.findAll({ where: { id } });

      if (!games) {
        return res.status(400).json({ msg: 'User has no games' });
      }

      return res.status(200).json({ games });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getAll = async (req, res) => {
    try {
      const games = await Game.findAll();

      return res.status(200).json({ games });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    create,
    updateGame,
    getUserGames,
    getAll,
  };
};

module.exports = GameController;
