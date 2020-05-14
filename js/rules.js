/**
 * Update score
 */
function updateScore() {
    if (player.score <= 0) {
        gameStarted = false;
        player.score = 0;
        showPopup("You lose...", "Unfortunately, you failed the Maze...")
    }
    $("#score").html(player.score);
}

/**
 * Check the player movement possibility.
 * @param direction
 */
function checkMovement(direction) {
    let canMove = false;
    let cellValue;
    if (direction === "up" && player.position[0] > 0) {
        cellValue = maze[player.position[0] - 1][player.position[1]];
    }
    if (direction === "down" && player.position[0] < 22) {
        cellValue = maze[player.position[0] + 1][player.position[1]];
    }
    if (direction === "left" && player.position[0] > 0) {
        cellValue = maze[player.position[0]][player.position[1] - 1];
    }
    if (direction === "right" && player.position[0] < 22) {
        cellValue = maze[player.position[0]][player.position[1] + 1];
    }
    if (cellValue !== "w") {
        if(cellValue === "e" && player.hasKey) {
            canMove = true;
        } else if (cellValue !== "e") {
            canMove = true;
        }
    }
    return canMove;
}

/**
 * Check the player position for key and exit features.
 */
function checkPosition() {
    if (maze[player.position[0]][player.position[1]] === "k") {
        player.hasKey = true;
        let itemKeyElem = $("#item-key");
        itemKeyElem.removeClass("disabled");
        itemKeyElem.addClass("enabled");
        $("#key").remove();
        maze[player.position[0]][player.position[1]] = " ";
        player.score = player.score - 2;
    } if (maze[player.position[0]][player.position[1]] === "s") {
        player.hasSword = true;
        let itemSwordElem = $("#item-sword");
        itemSwordElem.removeClass("disabled");
        itemSwordElem.addClass("enabled");
        $("#sword").remove();
        maze[player.position[0]][player.position[1]] = " ";
        player.score = player.score - 2;
    } else if (maze[player.position[0]][player.position[1]] === "e" && player.hasKey) {
        gameStarted = false;
        showPopup("You win!", "Congratulations, you succeeded the Maze! Your final score is: " + player.score + "!")
    } else if (maze[player.position[0]][player.position[1]] === "dr" || maze[player.position[0]][player.position[1]] === "db") {
        if(maze[player.position[0]][player.position[1]] !== "dr" || (maze[player.position[0]][player.position[1]] === "dr" && !player.hasSword)) {
            player.score = player.score - 100;
        } else {
            maze[player.position[0]][player.position[1]] = " ";
            $("#dragonRed").remove();
        }
    }
    updateScore()
}

function showPopup(title, message) {
    $("#popup-title").html(title);
    $("#popup-body").html(message);
    $("#game-popup").modal('show');
}
