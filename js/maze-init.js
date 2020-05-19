/**
 * Initialize the maze with the matrix
 */
function initMaze() {
    const gameZoneElement = $("#maze");
    for (const rowIndex in maze) {
        let rowElement = $('<div>');
        for (const cellIndex in maze[parseInt(rowIndex)]) {
            switch(maze[parseInt(rowIndex)][parseInt(cellIndex)]) {
                case "w":
                    rowElement.append('<div class="maze-cell wall"></div>');
                    break;
                case "k":
                    rowElement.append('<div class="maze-cell grass"></div>');

                    // Create key element
                    let keyHtmlElement = $('<div class="maze-element" id="key"></div>');
                    // Add key div into game zone
                    gameZoneElement.append(keyHtmlElement);
                    // Update key position on game board
                    $(keyHtmlElement).css("top", (rowIndex * 40) + "px");
                    $(keyHtmlElement).css("left", (cellIndex * 40) + "px");
                    break;
                case "s":
                    rowElement.append('<div class="maze-cell grass"></div>');

                    // Create sword element
                    let swordHtmlElement = $('<div class="maze-element" id="sword"></div>');
                    // Add key div into game zone
                    gameZoneElement.append(swordHtmlElement);
                    // Update sword position on game board
                    $(swordHtmlElement).css("top", (rowIndex * 40) + "px");
                    $(swordHtmlElement).css("left", (cellIndex * 40) + "px");
                    break;
                case "x":
                    rowElement.append('<div class="maze-cell grass"></div>');

                    // Create start element
                    let playerHtmlElement = $('<div class="maze-element player-right" id="player"></div>');
                    // Add player div into game zone
                    gameZoneElement.append(playerHtmlElement);
                    // Update player position on game board
                    $(playerHtmlElement).css("top", (rowIndex * 40) + "px");
                    $(playerHtmlElement).css("left", (cellIndex * 40) + "px");

                    // Save player start position
                    player.position = [parseInt(rowIndex), parseInt(cellIndex)];
                    break;
                case "dr":
                    rowElement.append('<div class="maze-cell grass"></div>');

                    // Create dragon element
                    let drHtmlElement = $('<div class="maze-element dragon-red" id="dragonRed"></div>');
                    // Add dragon div into game zone
                    gameZoneElement.append(drHtmlElement);
                    // Update dragon position on game board
                    $(drHtmlElement).css("top", (rowIndex * 40) + "px");
                    $(drHtmlElement).css("left", (cellIndex * 40) + "px");

                    // Save dragon start position
                    dragons.setRedDragonPosition([parseInt(rowIndex), parseInt(cellIndex)]);
                    break;
                case "db":
                    rowElement.append('<div class="maze-cell grass"></div>');

                    // Create dragon element
                    let dbHtmlElement = $('<div class="maze-element dragon-blue" id="dragonBlue"></div>');
                    // Add dragon div into game zone
                    gameZoneElement.append(dbHtmlElement);
                    // Update dragon position on game board
                    $(dbHtmlElement).css("top", (rowIndex * 40) + "px");
                    $(dbHtmlElement).css("left", (cellIndex * 40) + "px");

                    // Save dragon start position
                    dragons.setBlueDragonPosition([parseInt(rowIndex), parseInt(cellIndex)]);
                    break;
                case "e":
                    rowElement.append('<div class="maze-cell wall"></div>');

                    // Create exit element
                    let exitHtmlElement = $('<div class="maze-element" id="exit"></div>');
                    // Add exit div into game zone
                    gameZoneElement.append(exitHtmlElement);
                    // Update exit position on game board
                    $(exitHtmlElement).css("top", (rowIndex * 40) + "px");
                    $(exitHtmlElement).css("left", (cellIndex * 40) + "px");
                    break;
                default :
                    rowElement.append('<div class="maze-cell grass"></div>');
            }
        }
        gameZoneElement.append(rowElement);
    }
}

/**
 * Event on start button is pressed
 */
$(window).on('load', function () {
    $("#btn-start-game").on('click', function () {
        $("#maze").empty();
        if(!gameStarted) {
            maze = placeItems(items, displayMaze(mazeAlea(11,11)));
            initMaze();
            gameStarted = true;
            dragons.startMove();
            $("#btn-start-game").html("Stop it !");
        } else {
            gameStarted = false;
            dragons.stopMove();
            $("#btn-start-game").html("Start adventure");
        }
    });
    updateScore();
});
