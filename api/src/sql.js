/* eslint-disable no-multi-str */
const STARTUP = "\
    CREATE TABLE IF NOT EXISTS players( \
      id TEXT PRIMARY KEY, \
      username TEXT UNIQUE, \
      password TEXT, \
      current_games TEXT DEFAULT '', /* the ids of current matches */ \
      match_history TEXT DEFAULT ''/* the ids of previous matches */ \
      ); \
    CREATE TABLE IF NOT EXISTS games( \
      id TEXT PRIMARY KEY, \
      player_white INTEGER, \
      player_black INTEGER, \
      game_state_fen TEXT, \
      game_over INTEGER /* pseudo-boolean */ \
      );";

const ADD_USER = 'INSERT INTO players(username,password,id) VALUES(?,?,?);';

const LOGIN_USER = 'SELECT username, id FROM players \
WHERE username = ?;';

const FIND_USER = 'SELECT * FROM players WHERE username = ?;';

const GET_USERS = 'SELECT * FROM players;';

const GET_GAMES = 'SELECT current_games FROM players WHERE username = ?;';

const UPDATE_GAMES = 'UPDATE players SET current_games = ? WHERE username = ?;'

module.exports = {
  GET_USERS,
  STARTUP,
  ADD_USER,
  LOGIN_USER,
  FIND_USER,
  GET_GAMES,
  UPDATE_GAMES
}
