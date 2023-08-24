const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3001;


app.use(express.json()); 
app.use(express.urlencoded({ extended: false})); 


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use((req, res, next) => {
    res.locals.req = req;
    next();
});

const expRoutes = require('./server/routes/exp');
app.use('/', expRoutes);



app.listen(port, () => {
    console.log(`The application is running on the following port: ${port}.`);
})