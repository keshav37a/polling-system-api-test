//A package used to encrypt and decrypt using known algos like AES
const CryptoJS = require("crypto-js");

const secretKey = "final-flash";
 
// Encrypt
module.exports.encrypt = function(string){
    let ciphertext = CryptoJS.AES.encrypt(string, secretKey).toString();
    return ciphertext;
}

//Decrypt
module.exports.decrypt = function(ciphertext){
    let bytes  = CryptoJS.AES.decrypt(ciphertext, secretKey);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log('in decrypt: ', originalText);
    return originalText.toString();
}
 


 
