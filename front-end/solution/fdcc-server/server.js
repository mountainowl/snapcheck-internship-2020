var express = require('express');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var cors = require('cors');



var port = 3000;
var app = express();



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', users);

app.use('*', function(req, res) {
    res.redirect('/');
});


app.listen(port, function() {
    console.log("Server running on localhost:" + port);
})