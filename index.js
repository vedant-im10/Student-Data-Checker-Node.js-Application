const express = require('express');
const router = require('./details');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config();
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/")));

app.use('/', router);

app.listen(5000, () => {
    console.log("Port 5000 is running!!!");
});