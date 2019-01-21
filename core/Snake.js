function Snake(positions, board) {
    this.positions = positions;
    this.board = board;

    this.currentDirection = this.getCurrentDirection();
}

function getCurrentDirection() {
    try {
        const x0 = this.positions[0].x;
        const y0 = this.positions[0].y;
        const x1 = this.positions[1].x;
        const y1 = this.positions[1].y;

        if (x0 === x1 && y0 > y1)
            return "down";
        if (x0 === x1 && y0 < y1)
            return "up";
        if (x0 > x1 && y0 === y1)
            return "right";

        return "left";
    } catch (ex) {
        console.log("Exception: ", ex);
    }
};

function getNewDirection() {
    const food = this.board.food;
    const target = food[0];
    console.log("getNewDirection");
    console.log("target", target);
    const curDir = this.currentDirection;
    console.log("curDir", curDir);
    const x0 = this.positions[0].x;
    const y0 = this.positions[0].y;
    const halfX = Math.round(this.board.width / 2);
    const halfY = Math.round(this.board.width / 2);

    let newDir = "";
    if (target.x > x0) {
        newDir = "right";
    } else if (target.x < x0) {
        newDir = "left";
    } else if (target.y > y0) {
        newDir = "down";
    } else {
        newDir = "up";
    }

    // check reverse way
    console.log("--------- check reverse way --------");
    console.log("cur Dir", curDir);
    console.log("new Dir", newDir);
    if ((curDir === "left" && newDir === "right") || (curDir === "right" && newDir === "left")) {
        newDir = y0 < halfY ? "down" : "up";
    } else if ((curDir === "up" && newDir === "down") || (curDir === "down" && newDir === "up")) {
        newDir = x0 < halfX ? "right" : "left";
    }


    // check border
    newDir = this.getNewDirectionFromBorder(newDir);

    return newDir;
}

function getNewDirectionFromBorder(direction) {
    console.log("-----------   getNewDirectionFromBorder --------");
    let newDir = direction;
    const maxX = this.board.width - 1;
    const maxY = this.board.height - 1;
    const halfX = Math.round(this.board.width / 2);
    const halfY = Math.round(this.board.width / 2);
    const x0 = this.positions[0].x;
    const y0 = this.positions[0].y;

    console.log("new dir", direction);
    switch(direction) {
        case "up":
            if (y0 - 1 < 0) {
                newDir = x0 < halfX ? "right" : "left";
            }
            break;
        case "down":
            if (y0 + 1 > maxY) {
                newDir = x0 < halfX ? "right" : "left";
            }
            break;
        case "left":
            if (x0 - 1 < 0) {
                newDir = y0 < halfY ? "down" : "up";
            }
            break;
        case "right":
            if (x0 + 1 > maxX) {
                newDir = y0 < halfY ? "down" : "up";
            }
            break;
    }

    return newDir;
}


Snake.prototype.getCurrentDirection = getCurrentDirection;
Snake.prototype.getNewDirection = getNewDirection;
Snake.prototype.getNewDirectionFromBorder = getNewDirectionFromBorder;

module.exports = Snake;
