const Option = require('../../../models/option');
const Question = require('../../../models/question');

module.exports.home = async function(req, res){

    try{
        console.log(`home in options controller called`);
        let questionId = "5ea974411b90ef50d46aa634";
        let optionText = "randomOption";
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