var _gallery_prevDiv;

function Gallery_setInteractionCallbacks() {
    $('#gallery-back').click(function () {
        _gallery_prevDiv.style.display = 'inline';
        divGallery.style.display = 'none';

        console.log("Button Back From Gallery To Prev Div!");
    });
}

/* Gallery JS main function */
function showGalleryJS(gallery_prevDiv) {
    if (gallery_prevDiv == null) {
        gallery_prevDiv = divMainMenu;
        console.log('Gallery: Setting prevDiv to main menu!');
    }

    _gallery_prevDiv = gallery_prevDiv;
    console.log('showGalleryJS()');

    Gallery_setInteractionCallbacks();

    document.documentElement.style.backgroundColor = "#3F51B5";
}
