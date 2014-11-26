var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index', {
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
