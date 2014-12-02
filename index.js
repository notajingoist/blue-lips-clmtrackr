var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('welcome', {
        title: 'welcome'
    });
});

app.get('/instructions', function(req, res) {
    res.render('instructions', {
        title: 'instructions'
    });
});

app.get('/the-ball', function(req, res) {
    res.render('the-ball', {
        title: 'the ball'
    });
});



app.get('/emotion-detector', function(req, res) {
    res.render('emotion-detector', {
        title: 'blue lips'
    });
});


app.get('/expression-maker', function(req, res) {
    res.render('expression-maker', {
        title: 'expression maker'
    });
});

var server = app.listen(8000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});
