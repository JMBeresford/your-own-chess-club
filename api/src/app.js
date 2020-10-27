const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const sql = require('./sql');
const SQLiteStore = require('connect-sqlite3')(session);
const uuid = require('uuid/v4');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

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

passport.use(new LocalStrategy( async function(username, password, done) {
  let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) return console.error(err.message);
    
    return console.log('Connected to DB successfully.');
  });

  db.get('SELECT password FROM players WHERE username = ?', username, async function(err, row) {
    if (!row) {
      db.close();
      return done(null, false, {message: "User does not exist."});
    }

    if (await bcrypt.compare(password,row.password)) {
      db.get(sql.LOGIN_USER, username, function(err, row) {
        if (!row) {
          db.close()
          return done(null, false, {message: "Incorrect Credentials"});
        }

        db.close();
        return done(null, row);
      });
    }        
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) return console.error(err.message);
    
    return console.log('Connected to DB successfully.');
  });

  db.get(sql.LOGIN_USER, username, function(err, row) {
      if (err) console.log(err.message);
      if (!row) {
          console.log(row);
          console.log('deserialize failed');
          return done(null, false);
      }
      done(null, row);
  });
});


require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({credentials: true, origin: 'http://192.168.1.149:8080'}));
app.use(express.json());

app.use(session({
  genid: (req) => {
      return uuid();
  },
  name: "chess-cookie",
  store: new SQLiteStore ({
      db: 'session-store.db',
      dir: 'db/'
  }),
  secret: process.env.ACCESS_TOKEN_SECRET || 'asspoop',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
