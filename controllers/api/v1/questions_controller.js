const Question = require('../../../models/question');
const FData = require('../../../config/formattedData');

module.exports.home = async function(req, res){
    try{
        console.log(`home in questions controller called`);
        let questions = await Question.find().populate('options');
        return res.status(200).json({
            data: questions,
            message: 'List of questions'
        })
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }   
}

module.exports.getQuestionDetails = async function(req, res){
    console.log('getQuestionDetails in questions_controller called');
    try{
        let questionId = req.params.id;
        let questionFound = await Question.findById(questionId).populate('options');

        if(questionFound){
            let data = FData.getFormattedData(questionFound);
            return res.status(200).json({
                data: data,
                message: 'Successful'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }   
}

module.exports.createQuestion = async function(req, res){

    try{
        let title = req.query.title;
        console.log(title);
        console.log('create question called in questions_controller');
        //Check if the question title has already been used or not
    
        let question = await Question.findOne({title:title});
        // console.log(question._id);
        if(question){
            return res.status(405).json({
                message: 'This question title has already been used'
            });
        }
        else{
            let newQuestion = await Question.create({title: title});
            return res.status(200).json({
                data: newQuestion,
                message: 'Question added successfully'
            });    
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }
}
