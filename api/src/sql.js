/* eslint-disable no-multi-str */
const STARTUP = "\
    CREATE TABLE IF NOT EXISTS players( \
      id TEXT PRIMARY KEY, \
      username TEXT UNIQUE, \
      password TEXT, \
      games TEXT DEFAULT ''\
      ); \
    CREATE TABLE IF NOT EXISTS games( \
      id TEXT PRIMARY KEY, \
      player_white INTEGER, \
      player_black INTEGER, \
      fens TEXT NOT NULL DEFAULT '[]', \
      game_over INTEGER, \
      winner INTEGER\
      );";

const ADD_USER = 'INSERT INTO players(username,password,id) VALUES(?,?,?);';

const LOGIN_USER = 'SELECT username, id FROM players \
                    WHERE username = ?;';

const AUTH_USER = 'SELECT auth_tokens FROM players WHERE username = ?;'

const FIND_USER = 'SELECT * FROM players WHERE username = ?;';

const GET_USERS = 'SELECT * FROM players;';

const GET_GAMES = 'SELECT games FROM players WHERE username = ?;';

const UPDATE_PLAYER_GAMES = 'UPDATE players SET games = ? WHERE username = ?;';

const UPDATE_FENS = 'UPDATE games SET fens = ? WHERE id = ?;';

module.exports = {
  GET_USERS,
  STARTUP,
  ADD_USER,
  LOGIN_USER,
  FIND_USER,
  GET_GAMES,
  UPDATE_PLAYER_GAMES,
  UPDATE_FENS,
  AUTH_USER
}
