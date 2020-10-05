const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const sql = require('../sql');

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

    res.status(200).send(rows);
  })
});

router.post('/register', async (req, res, next) => {
  const pass1 = req.body.passwordInitial;
  const pass2 = req.body.passwordConfirmation;

  if(pass1 !== pass2) {
    return res.status(500).send('Password mismatch, try again.');
  }

  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(pass1, 10);

  const user = { username: username, password: hashedPassword };

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
          return res.status(500).send("Username exists already.");
      }
      console.log(err.message);
      return;
    } 
    res.status(200).send('Registration successful. Please return to login.')
    console.log(`${username} added successfully with id ${this.lastID} and pw ${hashedPassword}`);
    
  }).close();
  return res.status(500);
});

router.post('/login', (req, res, next) => {

})

module.exports = router;