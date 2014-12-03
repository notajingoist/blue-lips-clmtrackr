var BLUELIPS = $.extend(true, {
    init: function() {
        this.initVars();
        this.initPlugins();
        this.bindEventHandlers();
        this.setupVideo();
        this.initClm();
        this.initEmotion();
        this.data = data;

        this.colors = this.data.colors;
        this.audioSrc = this.data.audio;
        this.expressions = this.data.expressions;

        this.mediaStarted = false;

        // console.log(this.data);
    },

    initVars: function() {
        // this.$container = $('.container');
        this.$phrase = $('.phrase');
        this.$media = $('.media');
        this.$body = $('body');
        this.$vid = $('#video-el');
        this.vid = this.$vid[0];
        this.$overlay = $('#overlay');
        this.overlay = this.$overlay[0];
        this.overlayCC = this.overlay.getContext('2d');
        this.$startBtn = $('#start-button');

        this.$audio = $('#audio-src');
        this.audio = this.$audio[0];
    },

    initPlugins: function() {

    },

    bindEventHandlers: function() {
        this.$startBtn.on('click', this.startMedia.bind(this));
        this.$audio.on('timeupdate', this.audioPositionChanged.bind(this));
        this.$audio.on('ended', this.resetBackgroundColor.bind(this));
    },

    resetBackgroundColor: function(e) {
        this.$body.css('background-color', '#eee');
    },

    initAudio: function() {
        this.$audio.attr('src', this.audioSrc);
        this.audio.play();
        this.audioPos = 0;
    },

    // get position of the audio
    // change the background color of the document based off the position
    audioPositionChanged: function(e) {
        // Display the current position of the video in a p element with id="demo"
        this.audioPos = this.audio.currentTime;
        this.currColor = '';
        this.currImage = '';
        this.currPhrase = '';
        // console.log(this.audioPos);

        // if (this.audio.currentTime > this.data)

        var colors = $.extend(true, {}, this.colors);
        var expressions = $.extend(true, {}, this.expressions);

        for (t in colors) {
            if (this.changeBackgroundColor('#' + colors[t], parseFloat(t))) {
                delete colors[t];
            }
        }

        for (t in expressions) {
            var expression = expressions[t];
            if (this.changeExpression(expression.image, expression.phrase, parseFloat(t))) {
                delete expressions[t];
            }
        }

        console.log(Object.keys(this.expressions).length);

        // this.changeBackgroundColor('red', 1);
        // this.changeBackgroundColor('blue', 2);
    },

    changeExpression: function(imageSrc, phrase, timePos) {
        if (this.audioPos > timePos) {
            if (imageSrc !== this.currImage) {
                this.$media.css({
                    'background': 'url("' + imageSrc + '") center 25% no-repeat',
                    'background-size': '250px auto'
                });
                this.currImage = imageSrc;
            }

            if (phrase !== this.currPhrase) {
                this.$phrase.html(phrase);
                this.currPhrase = phrase;
            }
            return true;
        } else {
            return false;
        }
    },

    changeBackgroundColor: function(color, timePos) {
        if (this.audioPos > timePos) {
            if (color !== this.currColor) {
                this.$body.css('background-color', color);
                this.currColor = color;
            }
            return true;
        } else {
            return false;
        }
    },

    setupVideo: function() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

        // check for camerasupport
        if (navigator.getUserMedia) {
            // set up stream
            var videoSelector = {video : true};
            if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
                var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
                if (chromeVersion < 20) {
                    videoSelector = "video";
                }
            };

            var context = this;
            navigator.getUserMedia(videoSelector, function( stream ) {
                if (context.vid.mozCaptureStream) {
                    context.vid.mozSrcObject = stream;
                } else {
                    context.vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                }
                context.vid.play();
            }, function() {
                alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
            });
        } else {
            alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
        }

        this.$vid.on('canplay', this.enableStart.bind(this));
    },

    enableStart: function() {
        this.$startBtn.attr('value', 'start');
        this.$startBtn.attr('disabled', null);
    },

    initClm: function() {
        this.ctrack = new clm.tracker({useWebGL: true});
        this.ctrack.init(pModel);
    },

    startMedia: function(e) {
        this.mediaStarted = !this.mediaStarted;
        if (this.mediaStarted) {
            this.$startBtn.attr('value', 'stop');
            //start audio
            this.initAudio();

            //start video
            this.vid.play();

            //start tracking
            this.ctrack.start(this.vid);

            //start loop to draw face
            this.drawLoop();
        } else {
            this.$startBtn.attr('value', 'start');
        }
    },

    drawLoop: function() {
        requestAnimFrame(this.drawLoop.bind(this));
        this.overlayCC.clearRect(0, 0, 400, 300);

        var cpos = this.ctrack.getCurrentPosition();
        if (cpos) {
            this.ctrack.draw(this.overlay);
            this.updatePos(cpos);
        }

        var cparam = this.ctrack.getCurrentParameters();
        var er = this.ec.meanPredict(cparam);
        if (er) {
            this.updateData(er);
        }
    },

    initEmotion: function() {
        this.ec = new emotionClassifier();
        this.ec.init(emotionModel);
        this.emotionData = this.ec.getBlank();
    },

    updateData: function(data) {
        for (var i = 0; i < data.length; i++) {
            var emotion = data[i].emotion;
            var value = data[i].value;

            // console.log(emotion + ': ' + value);
        }
    },

    updatePos: function(positions) {
        for (var i = 0; i < positions.length; i++) {
            // console.log(positions[i]);
        }
    }

}, window.BLUELIPS || (window.BLUELIPS = {}));

BLUELIPS.init();
