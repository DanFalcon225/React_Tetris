export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;


//Multi dimentional array which is represents a play canvas. For every row, funcation creates a new array with the cells
//which is filled by 3rd array which will contain actual tetris objects
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear']),
    );
//renamed x and y to moveX and move Y respectively this is done for further loops
export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x = 0; x < player.tetromino[y].length; x += 1) {
            // 1. Check that we are on an actual tetromino cell
            if (player.tetromino[y][x] !== 0) {
                if(
                //2. Check that our move is inside the game areas height - (y)
                //We should not go through the bottom of the play area
                // chained short circuit in use
                !stage[y + player.pos.y + moveY] ||   
                //3. Check that our move is inside the game areas width - (x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                //4. Check that the cell we are moving to is not set to clear
                //If it is clear we are not colliding
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 
                    'clear'
                ) {
                   return true;     
                }
            }
        }
    }
};