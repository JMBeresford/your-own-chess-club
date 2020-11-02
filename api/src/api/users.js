const express = require('express');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const sql = require('../sql');
const uuid = require('uuid/v4');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();
router.get('/', (req, res) => {
  let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log('Connected to DB successfully.');
    }
  });

  db.all(sql.GET_USERS, (err,rows) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }

    return res.status(200).send(rows);
  })
});

router.post('/register', async (req, res, next) => {
  console.log(req.body);
  const pass1 = req.body.pass1;
  const pass2 = req.body.pass2;

  if(pass1 !== pass2) {
    return res.status(400).send('Password mismatch, try again.');
  }

  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(pass1, 10);

  const user = { username: username, password: hashedPassword, id: uuid() };

  let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log('Connected to DB successfully.');
    }
  });

  db.run(sql.ADD_USER, Object.values(user), function(err) {
    if (err) {
      if (err.errno === 19) {
          return res.status(400).send("Username exists already.");
      }
      console.log(err.message);
      return;
    }

    resUser = {username: user.username, id: user.id}
    console.log(`${username} added successfully with id ${this.lastID} and pw ${hashedPassword}`);
    return res.status(201).send(resUser);
    
  }).close();
  return res.status(500);
});

router.get('/signin', (req,res) => {
  if (req.isAuthenticated()) {
    return res.status(201).send(req.user);
  } else {
    return res.sendStatus(401);
  }
})

router.post('/signin', passport.authenticate('local'), (req, res) => {
  
  return res.sendStatus(200);
})

router.get('/signout', (req,res) => {
  req.session.destroy();
  res.clearCookie('chess-cookie');
  res.clearCookie('chess-cookie.sig');
  
  return res.sendStatus(200);
})

router.get('/games', (req,res) => {
  const user = req.query.user;
  console.log(user);
  if (!req.user) {
    console.log("There was an error accessing player games.");
    return res.status(400).send("User not set properly.");
  }
  
  let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log('Connected to DB successfully.');
    }
  })

  db.get(sql.GET_GAMES, req.user.username, (err,rows) => {
    if (err) console.log(err);

    return res.status(200).send(rows);
  })

})

router.put('/games', (req,res) => {
  const payload = req.body;

  let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      console.log('Connected to DB successfully.');
    }
  })

  console.log(payload);

  db.run(sql.UPDATE_GAMES, payload, (err) => {
    if (err) return console.log(err);
  }).close()

  return res.sendStatus(204);
})

module.exports = router;