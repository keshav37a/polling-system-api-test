const Option = require('../../../models/option');
const Question = require('../../../models/question');
const FData = require('../../../config/formattedData');

//Retrieving the list of all questions along with their respective options
module.exports.home = async function(req, res){
    try{
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

//Creating an option only if it has not been created already
module.exports.createOption = async function(req, res){
    try{
        console.log(`home in options controller called`);
        let questionId = req.params.id;
        let optionText = req.query.option;
        let foundQuestion = await Question.findById(questionId).populate('options');
        if(foundQuestion){

            let foundOption = await Option.findOne({text:optionText});
            if(foundOption){
                return res.status(405).json({
                    message: 'This option title has already been added'
                });
            }

            let option = await Option.create({text: optionText, questionId: questionId, votes:0});
            foundQuestion.options.push(option);
            await foundQuestion.save();
            let formattedQuestion = FData.getFormattedData(foundQuestion);
            if(option){
                return res.status(200).json({
                    data: formattedQuestion,
                    message: 'Successfully added option'
                });
            }
        }
        else{
            return res.status(404).json({
                message: 'question id invalid'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }    
}

//increment vote by one for the particular option if it exists
module.exports.addVote = async function(req, res){
    let optionId = req.params.id;
    try{
        let foundOption = await Option.update({ _id: optionId }, { $inc: { votes: 1}});
        if(foundOption){
            let updatedOption = await Option.findById(optionId);
            return res.status(200).json({
                data: updatedOption, 
                message: 'vote added for option successfully'
            });
        }
        else{
            return res.status(404).json({
                message: 'option id not found'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }    
}

//deleting an option from the options table and the options field in the questions table if the option is found
module.exports.deleteOption = async function(req, res){
    try{
        let id = req.params.id;
        let foundOption = await Option.findById(id);
        if(foundOption){
            //check if option has votes
            if(foundOption.votes>0){
                return res.status(405).json({
                    message: 'This option cannot be deleted as it has votes'
                });
            }
            else{
                let removedOption = await foundOption.remove();
                let questionId = removedOption.questionId;
                let questionFound = await Question.findById(questionId).populate('options');

                await questionFound.update({$pull: {options: {$in : [id]}}});
                await questionFound.save();

                if(questionFound){
                    let data = FData.getFormattedData(questionFound);
                    return res.status(200).json({
                        data: data,
                        message: 'Successful'
                    });
                }
            }
        }
        else{
            return res.status(404).json({
                message: 'Option not found'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }    
}

