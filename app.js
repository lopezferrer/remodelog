require("dotenv").config()
const express = require('express');
const app = express();
const works = require('./models/works.js')
const methodOverride = require('method-override');
const {render} = require('ejs');
const mongoose = require('mongoose');
const Work = require('./models/works.js')
const PORT = process.env.PORT||4000;
const db = mongoose.connection
const worksController = require('./controllers/works.js')

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodOverride('_method'))
app.use('/works', worksController)
app.use(express.static('public'));

//LANDING
app.get('/', (req, res)=>{
  res.render('landing.ejs');
});

app.listen(PORT, ()=>{
  console.log(`Express listening 🎧 to port ${PORT}`)
});
