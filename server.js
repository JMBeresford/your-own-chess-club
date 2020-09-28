require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const sql = require('./js/sql.js');
const uuid = require('uuid/v4');
const SQLiteStore = require('connect-sqlite3')(session);


const morgan = require('morgan');

let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) console.error(err.message);

    console.log('Connected to DB successfully.');
})

db.serialize(() => {
    sql.STARTUP.forEach((cmd) => {
        db.run(cmd, function(err) {
            if (err) {
                return console.log(err);
            }
        })
    })
})

const server = express();

//server.use(morgan('dev'));

server.use(express.json())
server.use(express.static(__dirname));
server.use(session({
    genid: (req) => {
        console.log("Generating UUID...");
        console.log(req.sessionID);
        return uuid();
    },
    store: new SQLiteStore({
        db: 'chess-club.db',
        dir: 'db/'
    }),
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true
}));

// required for parsing body of POST request from html form
server.use(express.urlencoded({extended: true})) 


// HELPER FUNCTIONS
function checkPasswordConfirmation(req, res, next) {
    const pass1 = req.body.passwordInitial;
    const pass2 = req.body.passwordConfirmation;

    if(pass1 !== pass2) return res.status(500).send("Password mismatch, try again.");

    next(); // password confirmed, continue to registration
}

// WEB PAGES
server.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})

server.get('/home', (req,res) => {
    console.log(req.sessionID);
    res.sendFile(__dirname + '/page/home.html');
})

server.get('/register', (req,res) => {
    res.sendFile(__dirname + '/page/register.html');
})

server.get('/game', (req,res) => {
    res.sendFile(__dirname + '/page/game.html');
})

server.get('/signin', (req,res) => {
    res.sendFile(__dirname + '/page/signin.html');
})

// API ACCESS
server.post('/api/register', checkPasswordConfirmation, async (req,res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.passwordInitial, 10);

    const user = { username: username, password: hashedPassword };
    
    db.run(sql.ADD_USER, Object.values(user), function(err) {
        if (err) {
            if (err.errno === 19) {
                return res.status(500).send("Username exists already.");
            }
            return;
        } else {
            req.session.user = user;
            req.session.save();
            //res.status(200).redirect('/home');
            res.send("ok");
            console.log(req.session.user);
            console.log(`${username} added successfully with id ${this.lastID} and pw ${hashedPassword}`);
        }
    })

})

server.post('/api/signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    db.get(sql.FIND_USER, username, async function(err,row) {
        if (err) {
            console.log(err);
            return res.status(500).send("There was an error.")
        } else {
            if (!row) {
                return res.status(401).send("Invalid login credentials.");
            } else {
                await bcrypt.compare(password, row.password, (err,same) => {
                    if (same) {
                        req.session.user = {username: username};
                        req.session.save();
                        return res.status(200).redirect("/home");
                    }
                    else {
                        return res.status(401).send("Invalid login credentials.");
                    }
                })
            }
        }
    })
})


server.listen(3000)