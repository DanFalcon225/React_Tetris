import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { checkCollision, STAGE_WIDTH } from '../gameHelpers';


//Using ES6 structuring below code has been simplified to 1 line
    //without ES6
    //const playerState = useState();
    //const player = playerState[0]
    //const setPlayer = playerState[1]
    //with ES6
    //const [player, setPlayer] = useState();

export const usePlayer = () => {
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (matrix, dir) => {
        // Transform rows to columns - transpose
        const rotatedTetro = matrix.map((_, index) => 
            matrix.map(col => col[index]),
        );
        //Reverse each row to get a rotated tetromino(matrix)
        if(dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage, dir) => {
        //creating a complete clone of the player to do not work with player object in the state
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            
            if (offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }

        setPlayer(clonedPlayer);
    };

    //spread previouse state
    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided,
        }))
    }

    //call random tetromino
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])

    return [player, updatePlayerPos, resetPlayer, playerRotate];
}