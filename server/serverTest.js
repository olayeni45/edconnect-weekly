require('dotenv').config();
const mongoose = require("mongoose");
const register = require("@react-ssr/express/register");
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const app = express();
const flash = require('express-flash');
const methodOverride = require('method-override')

const passport = require('passport');

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'mySessions'
});


// move all app code here

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store,
    resave: true,
    saveUninitialized: false
}));

app.use(flash());
app.use(methodOverride('_method'));

app.use('/api', require('./routes/api'));
app.use("/", require("./controllers/home"));
app.use('/', require("./controllers/user"));
app.use('/', require("./controllers/project"));

app.use(express.static('public'));


mongoose.set('useFindAndModify', false);



module.exports = app;