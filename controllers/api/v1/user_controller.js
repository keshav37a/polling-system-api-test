const User = require('../../../models/user');
const Crypto = require('../../../config/crypto');
const jwt = require('jsonwebtoken');

module.exports.signUp = async function(req, res){
    try{
        console.log('signup called');
        console.log(req.body);
        let unencrPass = req.body.password;

        //Encrypting the passport before storing it in db
        let encrPass = Crypto.encrypt(unencrPass);
        console.log(req.query);
        let user = await User.create({name: req.body.name, email:req.body.email, password:encrPass});

        let data={};
        data.name = user.name;
        data.email = user.email;
        data.createdAT = user.createdAt;

        return res.status(200).json({
            data: data,
            message:'SignUp in users controller called'
        });
    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        })
    }
    
}

module.exports.createSession = async function (req, res) {
    //Using passport library
    try{
        console.log(req.body);
        let user = await User.findOne({email: req.body.email});

        //Decrypting the passport before comparing
        let encrPass = user.password;
        let dencrPass = Crypto.decrypt(encrPass);

        if(!user || dencrPass != req.body.password){
            return res.json(422, {
                message: 'Invalid username/password'
            })
        }
        else{
            return res.json(200, {
                message: 'Sign in successful. Here is your token. Please keep it safe',
                data: {
                    token: jwt.sign(user.toJSON(), 'vote-for-me', {expiresIn: 10000000})
                }
            })
        }

    }
    catch(err){
        return res.status(500).json({
            message: `${err}`
        });
    }   
}