const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'games';

const Game = sequelize.define('Game', {
  id: {
    type: Sequelize.DataTypes.UUIDV4,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  playerWhite: {
    type: Sequelize.DataTypes.TEXT,
  },
  playerBlack: {
    type: Sequelize.DataTypes.TEXT,
  },
  fens: {
    type: Sequelize.TEXT,
    defaultValue: '["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"]',
  },
  gameOver: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0,
  },
  winner: {
    type: Sequelize.DataTypes.TEXT,
  },
}, { tableName });

// eslint-disable-next-line
Game.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  return values;
};

module.exports = Game;
