const port = 8000;
const express = require('express');
const app = new express();
const db = require('./config/mongoose');

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err) { console.log(`${err}`); }

    console.log(`app up and running on port ${port}`);
})