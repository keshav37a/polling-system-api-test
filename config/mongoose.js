const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/polling_system_api');
const db = mongoose.connection;

db.on('error', console.error.bind('error in connecting to db'));

db.once('open', function(){
    console.log('successfully connected to the database');
})
