var express = require('express');
var app = express();

app.use(express.static('public/index.html'));

app.listen(3333, function(){
    console.log('Server is listening');
});
