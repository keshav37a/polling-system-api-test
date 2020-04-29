//function to format data and send only the required fields and adding a link to increase votes for each option
module.exports.getFormattedData = function(questionFound){
    let data = {};
    data.id = questionFound._id;
    data.title = questionFound.title;
    let optsArr = [];
    data.options = optsArr;
    let opts = questionFound.options;
    opts.forEach((element)=>{
        let singleOpt = {};
        singleOpt.id = element._id;
        singleOpt.text = element.text;
        singleOpt.votes = element.votes;
        singleOpt.link_to_vote = 'http://localhost:8000/api/v1/options/'+singleOpt.id+'/add_vote';
        data.options.push(singleOpt);
    })
    return data;
}