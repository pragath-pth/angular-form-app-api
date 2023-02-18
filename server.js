require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');
const dbConfig = require('./src/configs/db.config');

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const userRoute = require('./src/routes/user.routes');
app.use('/users', userRoute)

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.error(err));

// simple route
app.get("/", (req, res) => {
      res.json({ message: "Welcome to pth application." });
    // res.render('index', { title: 'Express' });
});

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});