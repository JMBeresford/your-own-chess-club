/* eslint-disable no-multi-str */
const STARTUP = "\
    CREATE TABLE IF NOT EXISTS players( \
      id INTEGER PRIMARY KEY, \
      username TEXT UNIQUE, \
      password TEXT, \
      current_games TEXT DEFAULT '', /* the ids of current matches */ \
      match_history TEXT DEFAULT ''/* the ids of previous matches */ \
      ); \
    CREATE TABLE IF NOT EXISTS games( \
      id INTEGER PRIMARY KEY, \
      player_white INTEGER, \
      player_black INTEGER, \
      game_state_fen TEXT, \
      game_over INTEGER /* pseudo-boolean */ \
      );";

const ADD_USER = 'INSERT INTO players(username,password) VALUES(?,?);';

const LOGIN_USER = 'SELECT username, id FROM players \
WHERE username = ?;';

const FIND_USER = 'SELECT * FROM players WHERE username = ?;';

const GET_USERS = 'SELECT * FROM players;';

module.exports.GET_USERS = GET_USERS;
module.exports.STARTUP = STARTUP;
module.exports.ADD_USER = ADD_USER;
module.exports.LOGIN_USER = LOGIN_USER;
module.exports.FIND_USER = FIND_USER;
