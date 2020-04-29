module.exports.home = function(req, res){
    console.log(`home in questions controller called`);
    return res.status(200).json({
        message: 'home in questions controller called'
    });
}