require("dotenv").config()
const express = require('express');
const app = express();
const works = require('./models/works.js')
const methodOverride = require('method-override');
const {render} = require('ejs');
const mongoose = require('mongoose');
const Work = require('./models/works.js')
const PORT = process.env.PORT||4000;
//const mongoURI = 'mongodb://localhost:27017/'+ 'works'
const db = mongoose.connection
const worksController = require('./controllers/works.js')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

/*
mongoose.connect(mongoURI, () => {
  console.log('Connected to Mongod')
})
*/

//app.set("view engine", "ejs")
app.use(methodOverride('_method'))
app.use('/works', worksController)
app.use(express.static('public'));

/*
db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('Mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('Mongo disconnected'))
*/

//LANDING
app.get('/', (req, res)=>{
  res.send('Welcome to RemodeLog');
});

app.listen(PORT, ()=>{
  console.log(`Express listening 🎧 to port ${PORT}`)
});
