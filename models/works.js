const mongoose = require('mongoose');

//SCHEMA
const worksSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    responsible: String,
    contactNumber: {type: Number},
    status: {type:String, enum:['Not started', 'In progress', 'Completed']}, 
    startDate: {type: Date},
    endDate: {type: Date},
    budget: {type: Number, min: [0, 'Price can\'t be negative']},
    paid: {type: Number, min: [0, 'Price can\'t be negative']},
    note: String,
    startImg: String,
    finalImg: String,
  }, {timestamps: true});

//MODEL
const Work = mongoose.model('Work', worksSchema);

//EXPORT
module.exports = Work;
