function displayMaze(m) {
    let textMaze= [];
    for (let j= 0; j<m.x*2+1; j++) {
        let line= [];
        if (0 === j%2) {
            for (let k = 0; k < m.y * 2 + 1; k++) {
                if (0 === k % 2) {
                    line[k] = "w";
                }
                else if (j > 0 && m.verti[j / 2 - 1][Math.floor(k / 2)]) {
                    line[k] = " ";
                }
                else {
                    line[k] = "w";
                }
            }
        }
        else
            for (let k=0; k<m.y*2+1; k++)
                if (0 === k%2)
                    if (k>0 && m.horiz[(j-1)/2][k/2-1]) {
                        line[k] = " ";
                    }
                    else {
                        line[k] = "w";
                    }
                else {
                    line[k] = " ";
                }
        if (0 === j) {
            line[1] = "x";
        }
        if (m.x*2-1 === j) {
            line[2 * m.y] = "e";
        }
        textMaze.push(line);
    }
    return textMaze;
}

function generateMaze(x, y) {
    let n=x*y-1;
    if (n<0) {alert("illegal maze dimensions");return;}
    let horiz=[]; for (let j= 0; j<x+1; j++) horiz[j]= [];
    let verti=[]; for (let j= 0; j<y+1; j++) verti[j]= [];
    let here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
    let path= [here];
    let unvisited= [];
    for (let j= 0; j<x+2; j++) {
        unvisited[j]= [];
        for (let k= 0; k<y+1; k++)
            unvisited[j].push(j>0 && j<x+1 && k>0 && (j !== here[0]+1 || k !== here[1]+1));
    }
    while (0<n) {
        let potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
            [here[0]-1, here[1]], [here[0],here[1]-1]];
        let neighbors= [];
        for (let j = 0; j < 4; j++)
            if (unvisited[potential[j][0]+1][potential[j][1]+1]) {
                neighbors.push(potential[j]);
            }
        if (neighbors.length) {
            n= n-1;
            next= neighbors[Math.floor(Math.random()*neighbors.length)];
            unvisited[next[0]+1][next[1]+1]= false;
            if (next[0] === here[0]) {
                horiz[next[0]][(next[1] + here[1] - 1) / 2] = true;
            }            else {
                verti[(next[0] + here[0] - 1) / 2][next[1]] = true;
            }
            path.push(here= next);
        } else
            here= path.pop();
    }
    return ({x: x, y: y, horiz: horiz, verti: verti});
}

function placeItems(itemArray, textMaze) {
    for(let i = 0; i < itemArray.length; i++){
        let itemPositionning = [];
        do {
            itemPositionning = [parseInt(Math.floor(Math.random()*21 + 1)), parseInt(Math.floor(Math.random()*21 + 1))];
        }
        while(textMaze[itemPositionning[0]][itemPositionning[1]] !== " ")
        textMaze[itemPositionning[0]][itemPositionning[1]] = itemArray[i];
    }
    return textMaze;
}

/**
 * "w" = wall
 * " " = grass
 * "k" = key
 * "s" = start point
 * "e" = exit point
 * "dr" = dragon red
 * "db" = dragon blue
 */
let items = ["k", "dr", "db", "s"];
let maze = placeItems(items, displayMaze(generateMaze(11,11)));