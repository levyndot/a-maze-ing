/**
 * Manage dragons movements
 */
let dragons = {
    redPosition : [0,0],
    redPreviousMove : "",
    bluePosition : [0,0],
    bluePreviousMove : "",


    move : function() {
        let redDragonElem = $("#dragonRed");
        let blueDragonElem = $("#dragonBlue");
        let directionToMove;

        // Red Dragon
        directionToMove = this._getDirection(this.redPosition, this.redPreviousMove);
        maze[this.redPosition[0]][this.redPosition[1]] = " ";
        this.redPosition = this._computeNewPosition(this.redPosition, directionToMove);
        maze[this.redPosition[0]][this.redPosition[1]] = "dr";
        this.redPreviousMove = directionToMove;
        redDragonElem.css("top", (this.redPosition[0] * 40) + "px");
        redDragonElem.css("left", (this.redPosition[1] * 40) + "px");

        // Blue Dragon
        directionToMove = this._getDirection(this.bluePosition, this.bluePreviousMove);
        maze[this.bluePosition[0]][this.bluePosition[1]] = " ";
        this.bluePosition = this._computeNewPosition(this.bluePosition, directionToMove);
        maze[this.bluePosition[0]][this.bluePosition[1]] = "db";
        this.bluePreviousMove = directionToMove;
        blueDragonElem.css("top", (this.bluePosition[0] * 40) + "px");
        blueDragonElem.css("left", (this.bluePosition[1] * 40) + "px");
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
