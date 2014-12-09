var socket = io.connect('http://localhost');
// socket.join('video1');
socket.emit('joinView', { view: 'view1' });
socket.on('streamVideo', function(data) {
    console.log('view got video stream')
    console.log(data);
});
