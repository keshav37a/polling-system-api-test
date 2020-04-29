const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes:{
        type: Number,
        required: true
    },
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    }
}, {
    timestamps: true
});

const Option = mongoose.model('option', optionSchema);
module.exports = Option;