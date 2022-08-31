const express = require('express')
const router = express.Router()
const Work = require('../models/Work.js')

//NEW
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

//CREATE
router.post('/', (req, res)=>{
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
router.get('/', (req, res) => {
	Work.find({}, (error, allWorks) => {
		res.render('index.ejs', {
			works: allWorks
		});
	});
});

//SHOW
router.get('/:id', (req, res)=>{
    Work.findById(req.params.id, (err, foundWork)=>{
        res.render('show.ejs', {
            work:foundWork
        });
    });
});

//DELETE
router.delete('/:id', (req, res)=>{
    Work.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/works')
    })
})

//EDIT
router.get('/:id/edit', (req, res)=>{
    Work.findById(req.params.id, (err, foundWork)=>{
        res.render('edit.ejs',{work: foundWork})
    })
})

//UPDATE
router.put('/:id', (req, res)=>{
    Work.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
		res.redirect(`/works/${req.params.id}`);
    })
})

module.exports = router;
