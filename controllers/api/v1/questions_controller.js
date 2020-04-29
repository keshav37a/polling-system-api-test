const Question = require('../../../models/question');
const FData = require('../../../config/formattedData');
const Option = require('../../../models/option');

module.exports.home = async function(req, res){
    try{
        let questions = await Question.find().populate('options');
        let data = [];
        for(let i=0; i<questions.length; i++){
            console.log(questions[i]);
            let formattedQ = FData.getFormattedData(questions[i]);
            data.push(formattedQ);
        }
        return res.status(200).json({
            data: data,
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

module.exports.deleteQuestion = async function(req, res){
    try{
        let qId = req.params.id;
        let isVotePresent = false;
        let foundQuestion = await Question.findById(qId).populate('options');
        if(foundQuestion){
            let options = foundQuestion.options;
            for(let i=0; i<options.length; i++){
                let votes = options[i].votes;
                console.log(options[i]);
                if(votes>0){
                    isVotePresent = true;
                    break;
                }
            }
            if(isVotePresent){
                return res.status(405).json({
                    message: 'You cant delete this question as one of its options has votes in it'
                })
            }
            else{
                for(let i=0; i<options.length; i++){
                    console.log(options[i]);
                    await Option.findOneAndDelete({_id:options[i]});
                }
                let removedQuestion = await foundQuestion.remove();
                return res.status(200).json({
                    data: removedQuestion,
                    message: 'Question and associated options removed successfully'
                })
            }
        }
        else{
            return res.status(405).json({
                message: 'Question id not found'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }
}

