let gameStarted = false;
let player = {
    score: 1000,
    position: [0, 0],
    hasKey: false,
    hasSword: false
}

/*
"w" = wall
" " = grass
"k" = key
"s" = start point
"e" = exit point
"dr" = dragon red
"db" = dragon blue
This is a 23*23 maze
 */

let items = ["k", "dr", "db", "s"];
let maze = [];