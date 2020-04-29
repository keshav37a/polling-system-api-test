const Question = require('../../../models/question');

module.exports.home = async function(req, res){

    try{
        console.log(`home in questions controller called`);
        let title = "A random question to test db?";
        let question = await Question.create({title: title});
        return res.status(200).json({
            data: question,
            message: 'home in questions controller called'
        });
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }

    
}