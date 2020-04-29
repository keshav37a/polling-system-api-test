const Option = require('../../../models/option');
const Question = require('../../../models/question');

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
    
        // let foundOption = await Option.findById(optionId);
        // if(foundOption){
        //     // foundOption.updateOne({_id: optionId}, {$inc:{votes: 1}});
        //     foundOption.update({$inc:{votes: 1}});
        //     await foundOption.save();
        //     return res.status(200).json({
        //         data: foundOption, 
        //         message: 'vote added for option successfully'
        //     });
        // }
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