var Learn_animationImgState = {};
var Learn_imgWidth;
var Learn_imgHeight   


var Learn_progress = document.querySelector('#video-progress-bar');
var Learn_progressStyle = window.getComputedStyle(Learn_progress, null);
var Learn_progressFilled = document.querySelector('#video-progress');
var Learn_video = document.querySelector('#mainVid');
var Learn_divCurrentVideoTime = document.querySelector('#currentVideoTime');


function Learn_animateImg(imgLight) {
    const ANIM_LIGHT_DURATION = 125;
    const ANIM_LIGHT_LOOP_COUNT = 16;
    const ANIM_SCALE_DURATION = ANIM_LIGHT_DURATION * ( ANIM_LIGHT_LOOP_COUNT / 2 );
    const imgLightId = String(imgLight.id);
    const imgId = imgLightId.substring(0, imgLightId.length - "-light".length);

    var isVisible = parseFloat(imgLight.style.opacity) > 0.0;

    Learn_animationImgState[imgLightId]++;
    if (Learn_animationImgState[imgLightId] > ANIM_LIGHT_LOOP_COUNT) {
        return;
    }

    if (isVisible) {
        /*Light*/
        $('#' + imgLightId).animate({
            opacity: "0"
        }, {
            duration: ANIM_LIGHT_DURATION, queue: false, done: function () {
                Learn_animateImg(imgLight);
            }
        });
    }
    else {
        /*Light*/
        $('#' + imgLightId).animate({
            opacity: "0.75"
        }, {
            duration: ANIM_LIGHT_DURATION, queue: false, done: function () {
                Learn_animateImg(imgLight);
            }
        });
    }


    const imgRect = imgLight.getBoundingClientRect();
    const dY = ((Learn_imgHeight * 1.5) - Learn_imgHeight) / 2;
    const dX = ((Learn_imgWidth * 1.5) - Learn_imgWidth) / 2;
    if (Learn_animationImgState[imgLightId] == 1) {
        const targetWidth = (Learn_imgWidth * 1.5) + "px";
        const targetHeight = (Learn_imgHeight * 1.5) + "px";

        $('#' + imgLightId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "-=" + dY,
            left: "-=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });

        $('#' + imgId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "-=" + dY,
            left: "-=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });

    } else if (Learn_animationImgState[imgLightId] == ANIM_LIGHT_LOOP_COUNT / 2 + 1) {
        const targetWidth = (Learn_imgWidth) + "px";
        const targetHeight = (Learn_imgHeight) + "px";

        $('#' + imgLightId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "+=" + dY,
            left: "+=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });

        $('#' + imgId).animate({
            width: targetWidth,
            height: targetHeight,
            top: "+=" + dY,
            left: "+=" + dX
        }, {
            duration: ANIM_SCALE_DURATION, queue: false
        });
    }

}

function Learn_setGreenLights() {
    console.log('Learn_setGreenLights()');
    Learn_imgHeight = document.getElementById('emotion-anger').clientHeight;
    Learn_imgWidth = document.getElementById('emotion-anger').clientWidth;
    /* Set green rectangles size */
    var greenLights = document.getElementsByClassName('imgEmotionLight');
    Array.prototype.forEach.call(greenLights, function (el) {
        el.style.height = Learn_imgHeight + 'px';
        el.style.width = Learn_imgWidth + 'px';
    });

    const spaceWidth = (window.innerWidth - (7 * Learn_imgWidth)) / 8;

    var i;
    for (i = 1; i <= 7; i++) {
        var div = document.getElementById('div-emotion-' + i);
        div.style.left = (i * spaceWidth) + (i - 1) * Learn_imgWidth + 'px';
    }
}

function Learn_setInteractionCallbacksLearn() {
    console.log('Learn_setInteractionCallbacksLearn() begin');
    $('.imgEmotionLight').click(function () {
        if ($('#' + this.id).is(':animated') == false) {
            Learn_animationImgState[this.id] = 0;
            Learn_animateImg(document.getElementById(this.id));
        }
    });

    $('#video-progress-bar').click(function (e) {
        var marginLeft = parseFloat(window.getComputedStyle(Learn_progress).marginLeft.match(/\d+/)[0]);
        var percent = (e.pageX - marginLeft - Learn_progressFilled.clientWidth/2) / Learn_progress.clientWidth;

        Learn_video.currentTime = Learn_video.duration * percent;
    });


    var greenLights = document.getElementsByClassName('hover_button');
    Array.prototype.forEach.call(greenLights, function (el) {
        if (isMobile()) {
            el.onmousedown = function () {
                this.style.backgroundColor = '#D3D3D37A';
            };
            el.onmouseup = function () {
                this.style.backgroundColor = '#ff000000';
            };
        } else {
            el.onmouseover = function () {
                this.style.backgroundColor = '#D3D3D37A';
            };
            el.onmouseout = function () {
                this.style.backgroundColor = '#ff000000';
            };
        }
    });


    $('#button-fullscreen').click(function () {
        Learn_toggleFullScreen();
        });


    $('#learn-back-to-main-menu').click(function () {
        divMainMenu.style.display = 'inline';
        divLearn.style.display = 'none';

        Learn_video.pause();

        console.log("Button Back From Learn To Main Menu clicked!");
    });


    $('#button-gallery').click(function () {
        divGallery.style.display = 'inline';
        divLearn.style.display = 'none';

        Learn_video.pause();

        showGalleryJS(divLearn);

        console.log("Button Gallery clicked!");
    });

    console.log("Learn_setInteractionCallbacksLearn() end");
}

var lastOrientation = '';
function Learn_onVideoUpdate() {
    const orientation = screen.msOrientation || (screen.orientation || screen.mozOrientation || {}).type;
    if (orientation.indexOf('portrait') != -1) {
        Learn_video.pause();
    } else {
        if (Learn_video.paused && lastOrientation.indexOf('portrait') != -1) {
            Learn_video.play();
        }
    }
    lastOrientation = orientation;

    const percent = (Learn_video.currentTime / Learn_video.duration) * 100;
    progressWidth = Learn_progressStyle.getPropertyValue("width");
    progressWidth = progressWidth.substring(0, progressWidth.length - 2);
    progressWidth = parseFloat(progressWidth) * percent / 100;

    var marginLeft = parseFloat(Learn_progressStyle.marginLeft.match(/\d+/)[0]);
    Learn_progressFilled.style.left = (marginLeft + progressWidth) + "px";

    var cur = Learn_video.currentTime.toString();
    var dur = Learn_video.duration.toString();
    Learn_divCurrentVideoTime.textContent = cur.substring(0, cur.indexOf('.') + 2) + ' / ' + dur.substring(0, dur.indexOf('.') + 2);
}

function Learn_setVideoControls() {
    console.log('Learn_setVideoControls()');
    //Learn_imagePlay.src = "Images/ic_media_pause.png";
}

function Learn_onResize() {
    if (divLearn.style.display == 'inline') {
        console.log('Learn_onResize');

        Learn_setGreenLights();
    }
}

function Learn_setFullscreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
}

function Learn_toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

function Learn_setVideo(video) {
    console.log("Learn: "+video);
    Learn_video.src=video;
    Learn_video.play();
}

/* Learn JS main function */
function Learn_show() {
    console.log('Learn_show()');

    setInterval(Learn_onVideoUpdate, 50);

    Learn_setGreenLights();
    Learn_setVideoControls();

    Learn_setInteractionCallbacksLearn();

    window.onresize = Learn_onResize;

    Learn_setFullscreen();

    Learn_video.play();
}
