const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3001;


app.listen(port, () => {
    console.log(`The application is running on the following port: ${port}.`);
})