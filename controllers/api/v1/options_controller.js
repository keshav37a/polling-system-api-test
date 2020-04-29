module.exports.home = function(req, res){
    console.log(`home in options controller called`);
    return res.status(200).json({
        message: 'home in options controller called'
    });
}