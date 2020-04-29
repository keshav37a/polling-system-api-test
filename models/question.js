const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    options:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'option'
    }]
},{
    timestamps: true
});

const Question = mongoose.model('question', questionSchema);
module.exports = Question;
