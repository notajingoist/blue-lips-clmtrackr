var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

//story 1
app.get('/', function(req, res) {
    res.render('welcome', {
        title: 'welcome',
        instructionsLink: '/instructions/1'
    });
});
app.get('/welcome/1', function(req, res) {
    res.render('welcome', {
        title: 'welcome',
        instructionsLink: '/instructions/1'
    });
});
app.get('/instructions/1', function(req, res) {
    res.render('instructions', {
        title: 'instructions',
        storyLink: '/story/1',
        backLink: '/welcome/1'
    });
});
app.get('/story/1', function(req, res) {
    res.render('story', {
        title: 'story 1',
        storyData: 'story-1',
        backLink: '/instructions/1'
    });
});


//story 2
app.get('/welcome/2', function(req, res) {
    res.render('welcome', {
        title: 'welcome',
        instructionsLink: '/instructions/2'
    });
});
app.get('/instructions/2', function(req, res) {
    res.render('instructions', {
        title: 'instructions',
        storyLink: '/story/2',
        backLink: '/welcome/2'
    });
});
app.get('/story/2', function(req, res) {
    res.render('story', {
        title: 'story 2',
        storyData: 'story-2',
        backLink: '/instructions/1'
    });
});

//story 3
app.get('/welcome/3', function(req, res) {
    res.render('welcome', {
        title: 'welcome',
        instructionsLink: '/instructions/3'
    });
});

app.get('/instructions/3', function(req, res) {
    res.render('instructions', {
        title: 'instructions',
        storyLink: '/story/3',
        backLink: '/welcome/3'
    });
});

app.get('/story/3', function(req, res) {
    res.render('story', {
        title: 'story 3',
        storyData: 'story-3',
        backLink: '/instructions/3'
    });
});


//etc

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

var server = app.listen(process.env.PORT || 8000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
    socket.emit('news', { hello: 'world' });

    socket.on('my other event', function(data) {
        console.log(data);
    });

    socket.on('disconnect', function() {
        io.sockets.emit('user disconnected');
    });
});
