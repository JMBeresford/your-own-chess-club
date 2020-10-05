const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const sql = require('./sql');
const SQLiteStore = require('connect-sqlite3')(session);
const uuid = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;


require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

let db = new sqlite3.Database('./db/chess-club.db', (err) => {
  if (err) return console.error(err.message);
  
  return console.log('Connected to DB successfully.');
});

db.serialize(() => {
  db.run(sql.STARTUP, (err) => {
    if (err) return console.log(err)
    else console.log("DB setup complete.");
  }).close()
})

module.exports = app;
