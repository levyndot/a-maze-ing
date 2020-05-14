// Key press handler
$(window).keypress(function (e) {
    if (gameStarted === true) {
        let playerElem = $("#player");

        if (e.keyCode === 122) { // Z key
            if (checkMovement("up")) {
                player.position[0] = player.position[0] - 1;
                playerElem.css("top", (player.position[0] * 40) + "px");
                checkPosition();
                player.score = player.score - 2;
            }
        } else if (e.keyCode === 113) { // Q key
            if (checkMovement("left")) {
                player.position[1] = player.position[1] - 1;
                playerElem.css("left", (player.position[1] * 40) + "px");
                checkPosition();
                player.score = player.score - 2;
            }
            // Update image
            playerElem.removeClass("player-right");
            playerElem.addClass("player-left");
        } else if (e.keyCode === 115) { // S key
            if (checkMovement("down")) {
                player.position[0] = player.position[0] + 1;
                playerElem.css("top", (player.position[0] * 40) + "px");
                checkPosition();
                player.score = player.score - 2;
            }
        } else if (e.keyCode === 100) { // D key
            if (checkMovement("right")) {
                player.position[1] = player.position[1] + 1;
                playerElem.css("left", (player.position[1] * 40) + "px");
                checkPosition();
                player.score = player.score - 2;
            }
            // Update image
            playerElem.removeClass("player-left");
            playerElem.addClass("player-right");
        }
    }
});
