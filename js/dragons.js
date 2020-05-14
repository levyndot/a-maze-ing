/**
 * Manage dragons movements
 */
let dragons = {
    _redPosition : [0,0],
    redPreviousMove : "",
    _redKilled : false,
    _bluePosition : [0,0],
    bluePreviousMove : "",
    _timer : false,

    _move : function() {
        let redDragonElem = $("#dragonRed");
        let blueDragonElem = $("#dragonBlue");
        let directionToMove;

        // Red Dragon
        if(!this._redKilled) {
            directionToMove = dragons._getDirection(dragons._redPosition, dragons.redPreviousMove);
            maze[dragons._redPosition[0]][dragons._redPosition[1]] = " ";
            dragons._redPosition = dragons._computeNewPosition(dragons._redPosition, directionToMove);
            maze[dragons._redPosition[0]][dragons._redPosition[1]] = "dr";
            dragons.redPreviousMove = directionToMove;
            redDragonElem.css("top", (dragons._redPosition[0] * 40) + "px");
            redDragonElem.css("left", (dragons._redPosition[1] * 40) + "px");
        }

        // Blue Dragon
        directionToMove = dragons._getDirection(dragons._bluePosition, dragons.bluePreviousMove);
        maze[dragons._bluePosition[0]][dragons._bluePosition[1]] = " ";
        dragons._bluePosition = dragons._computeNewPosition(dragons._bluePosition, directionToMove);
        maze[dragons._bluePosition[0]][dragons._bluePosition[1]] = "db";
        dragons.bluePreviousMove = directionToMove;
        blueDragonElem.css("top", (dragons._bluePosition[0] * 40) + "px");
        blueDragonElem.css("left", (dragons._bluePosition[1] * 40) + "px");

        checkPosition();

        // Loop
        if(!gameStarted) {
            dragons.stopMove();
        } else {
            dragons._timer = setTimeout(dragons._move, 500);
        }
    },

    /**
     * Start dragons moving
     */
    startMove : function() {
        this._move()
    },

    /**
     * Stop dragons moving
     */
    stopMove : function() {
        clearTimeout(this._timer);
    },

    setRedDragonPosition : function (position) {
        this._redPosition = position;
    },

    setBlueDragonPosition : function (position) {
        this._bluePosition = position;
    },

    _getDirection : function (position, previousMove) {
        let cellValueUp, cellValueRight, cellValueDown, cellValueLeft;
        let direction = "";
        let availableDirections = [];

        cellValueUp = maze[position[0] - 1][position[1]];
        cellValueRight = maze[position[0]][position[1] + 1];
        cellValueDown = maze[position[0] + 1][position[1]];
        cellValueLeft = maze[position[0]][position[1] -1];

        if (this._cellIsValid(cellValueUp)) {
            availableDirections.push("up");
        }
        if (this._cellIsValid(cellValueRight)) {
            availableDirections.push("right");
        }
        if (this._cellIsValid(cellValueDown)) {
            availableDirections.push("down");
        }
        if (this._cellIsValid(cellValueLeft)) {
            availableDirections.push("left");
        }

        if(availableDirections.length === 1) {
            direction = availableDirections[0];
        } else {
            let forbiddenMove = "";
            if(previousMove === "up") {
                forbiddenMove = "down";
            } else if(previousMove === "right") {
                forbiddenMove = "left";
            } else if(previousMove === "down") {
                forbiddenMove = "up";
            } else if(previousMove === "left") {
                forbiddenMove = "right";
            }
            let filtered = availableDirections.filter(function(value){
                return value !== forbiddenMove;
            });

            if(filtered.length > 0) {
                let rand = Math.random();
                direction = filtered[Math.round(rand * (filtered.length - 1))];
            }
        }

        return direction;
    },

    _cellIsValid : function(value) {
        return value !== "w" && value !== "e" && value !== "dr" && value !== "db";
    },

    _computeNewPosition : function(position, direction) {
        let newPosition = position;
        switch (direction) {
            case "up":
                newPosition = [position[0] - 1, position[1]];
                break;
            case "right":
                newPosition = [position[0], position[1] + 1];
                break;
            case "down":
                newPosition = [position[0] + 1, position[1]];
                break;
            case "left":
                newPosition = [position[0], position[1] - 1];
                break;
            default:
                break;
        }
        return newPosition;
    }
};

