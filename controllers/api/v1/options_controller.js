const Option = require('../../../models/option');
const Question = require('../../../models/question');
const FData = require('../../../config/formattedData');

module.exports.home = async function(req, res){
    try{
        console.log(`home in options controller called`);
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

module.exports.createOption = async function(req, res){
    try{
        console.log(`home in options controller called`);
        let questionId = req.params.id;
        let optionText = req.query.option;
        // let optionText = "randomOptionN";
        let foundQuestion = await Question.findById(questionId);
        if(foundQuestion){
            let option = await Option.create({text: optionText, questionId: questionId, votes:0});
            foundQuestion.options.push(option);
            await foundQuestion.save();
            if(option){
                return res.status(200).json({
                    data: option,
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

module.exports.addVote = async function(req, res){
    console.log('addVote in options_controller called');
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


module.exports.deleteOption = async function(req, res){
    try{
        let id = req.params.id;
        let foundOption = await Option.findById(id);
        if(foundOption){
            //check if option has votes
            if(foundOption.votes>0){
                return res.status(405).json({
                    message: 'This option cannot be deleted as it has votes'
                })
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

