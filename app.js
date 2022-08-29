const express = require('express');
const app = express();
const works = require('./models/works.js')
const methodOverride = require('method-override');
const {render} = require('ejs');
const mongoose = require('mongoose');
const Work = require('./models/works.js')
const PORT = 3000;
const mongoURI = 'mongodb://localhost:27017/'+ 'works'
const db = mongoose.connection

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
mongoose.connect(mongoURI, () => {
  console.log('Connected to Mongod')
})
app.use(methodOverride('_method'))


db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('Mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('Mongo disconnected'))

//LANDING
app.get('/', (req, res)=>{
  res.send('Welcome to RemodeLog');
});

//NEW
app.get('/works/new', (req, res) => {
    res.render('new.ejs');
});

//CREATE
app.post('/works/', (req, res)=>{
	Work.create(req.body, (error, createdWork)=>{
        if (error){
        	console.log(error);
        	res.send(error);
        }
        else{
					res.redirect('/works');
        }
    });
});


//INDEX
app.get('/works', (req, res) => {
	Work.find({}, (error, allWorks) => {
		res.render('index.ejs', {
			works: allWorks
		});
	});
});


//SHOW
app.get('/works/:id', (req, res)=>{
    Work.findById(req.params.id, (err, foundWork)=>{
        res.render('show.ejs', {
            work:foundWork
        });
    });
});

//DELETE
app.delete('/works/:id', (req, res)=>{
    Work.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/works')
    })
})

//EDIT
app.get('/works/:id/edit', (req, res)=>{
    Work.findById(req.params.id, (err, foundWork)=>{
        res.render('edit.ejs',{work: foundWork})
    })
})

//UPDATE
app.put('/works/:id', (req, res)=>{
    Work.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
		res.redirect(`/works/${req.params.id}`);
    })
})

app.listen(PORT, ()=>{
  console.log(`Express listening 🎧 to port ${PORT}`)
});
