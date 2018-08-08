var Play_video;


function setInteractionCallbacks() {
    $('#play-back-to-main-menu').click(function () {
        const divMainMenu = document.querySelector('#main-menu');
        const divLearn = document.querySelector('#play');

        divMainMenu.style.display = 'inline';
        divLearn.style.display = 'none';

        Play_video.pause();

        console.log("Button Back From Play To Main Menu clicked!");
    });
}

function initReferences() {
    Play_video = document.querySelector('#mainVid');
}

/* Learn JS main function */
function showPlayJS() {
    console.log('showPlayJS()');

    initReferences();
    setInteractionCallbacks();

    //Play_video.play();
}
