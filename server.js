require('dotenv').config({path: './config/key.env'});
const express = require('express');
const path = require('path');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const {v4 : uuidv4} = require('uuid');
const port = process.env.PORT || 3001;
const app = express();
const favicon = require('serve-favicon');


app.use(express.json()); 
app.use(express.urlencoded({ extended: false})); 
  

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('public/img'));

app.use(favicon(path.join(__dirname, 'public', 'img', 'travel-icon.png')));

app.use(
    session({
       name: 'sid', 
       genid: (req) => {return uuidv4();},
       secret: process.env.SESSION_KEY,
       resave: false, // regenerates the session on each request
       proxy: true, // allows cookies to pass through proxy servers
       saveUninitialized: false,
       cookie: {
        sameSite: 'strict',
        path: '/',
        httpOnly: false, // httpOnly = false --> frontend JS can see the cookies
        secure: false, // set to true only when using HTTPS
        maxAge: 600000 // maxAge given in ms (600000ms = 10)
       },
       // concurrentDB allows for multiple DB connections simultaneously
       store: new SQLiteStore({ db: 'database.db', concurrentDB: true})
    })
);
app.use((req, res, next) => {
    res.locals.req = req;
    next();
});
// Find routes file
const usersRoutes = require('./server/routes/users.js');

// Mount routes to the main endpoint '/'
app.use('/', usersRoutes);

const expRoutes = require('./server/routes/exp.js');
app.use('/', expRoutes);

const contactusRoutes = require('./server/routes/contactus.js');
app.use('/', contactusRoutes);

const bookingRouter = require('./server/routes/booking.js'); 
app.use('/', bookingRouter);

app.listen(port, () => {
    console.log(`The application is running on the following port: ${port}.`);
})