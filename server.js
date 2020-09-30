require('dotenv').config()
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const sql = require('./js/sql.js');
const passport = require('passport');
const SQLiteStore = require('connect-sqlite3')(session);
const uuid = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;


const morgan = require('morgan');

let db = new sqlite3.Database('./db/chess-club.db', (err) => {
    if (err) console.error(err.message);
    
    console.log('Connected to DB successfully.');
})

db.serialize(() => {
    sql.STARTUP.forEach((cmd) => {
        db.run(cmd, function(err) {
            if (err) {
                console.log(err);
            }
        })
    })
})

passport.use(new LocalStrategy( async function(username, password, done) {
    db.get('SELECT password FROM players WHERE username = ?', username, async function(err, row) {
        if (!row) return done(null, false, {message: "User does not exist."});
        
        if (await bcrypt.compare(password,row.password)) {
            db.get(sql.LOGIN_USER, username, function(err, row) {
                if (!row) return done(null, false, {message: "Incorrect Credentials"});
                return done(null, row);
            });
        }        
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
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



const server = express();

//server.use(morgan('dev'));


// required for parsing body of POST request from html form
server.use(express.static(__dirname));
server.use(express.urlencoded({extended: true}));
server.use(express.json());
server.use(session({
    genid: (req) => {
        return uuid();
    },
    store: new SQLiteStore ({
        db: 'chess-club.db',
        dir: 'db/',
        concurrentDB: true
    }),
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());


// HELPER FUNCTIONS
function checkPasswordConfirmation(req, res, next) {
    const pass1 = req.body.passwordInitial;
    const pass2 = req.body.passwordConfirmation;

    if(pass1 !== pass2) return res.status(500).send("Password mismatch, try again.");

    next(); // password confirmed, continue to registration
}

// WEB PAGES
server.get('/', (req,res) => {
    if (req.user) {
        return res.redirect('/home');
    }
    res.sendFile(__dirname + '/page/index.html');
})

server.get('/home', (req,res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/page/home.html');
})

server.get('/register', (req,res) => {
    if (req.user) {
        return res.redirect('/home');
    }
    res.sendFile(__dirname + '/page/register.html');
})

server.get('/game', (req,res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    res.sendFile(__dirname + '/page/game.html');
})

server.get('/signin', (req,res) => {
    if (req.user) {
        return res.redirect('/home');
    }
    res.sendFile(__dirname + '/page/signin.html');
})

server.get('/signout', (req,res) => {
    if (req.user) {
        req.logout();
    }
    res.redirect('/');
})

// API ACCESS
server.post('/register', checkPasswordConfirmation, async (req,res) => {
    const username = req.body.username;
    const hashedPassword = await bcrypt.hash(req.body.passwordInitial, 10);

    const user = { username: username, password: hashedPassword };
    
    db.run(sql.ADD_USER, Object.values(user), function(err) {
        if (err) {
            if (err.errno === 19) {
                return res.status(500).send("Username exists already.");
            }
            console.log(err.message);
            return;
        } else {
            res.status(200).send('Registration successful. Please return to login.')
            console.log(`${username} added successfully with id ${this.lastID} and pw ${hashedPassword}`);
        }
    })
})

server.post('/signin', passport.authenticate('local',{
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureMessage: 'Incorrect Credentials'
    })
)


server.listen(3000)