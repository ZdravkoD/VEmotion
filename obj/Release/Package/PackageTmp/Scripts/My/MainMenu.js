$(document).ready(function () {
    $('#main-menu-button-learn').click(function () {
        console.log("Button LEARN clicked!");

        divMainMenu.style.display = 'none';
        divLearn.style.display = 'inline';

        Learn_show();
        console.log("Showing learn screen");
    });

    $('#main-menu-button-play').click(function () {
        console.log("Button PLAY clicked!");

        divMainMenu.style.display = 'none';
        divPlay.style.display = 'inline';

        showPlayJS();
        console.log("Showing play screen");
    });
});
