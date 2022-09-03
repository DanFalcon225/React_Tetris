import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    //tetris scores
    const linePoints = [40, 100, 300, 1200];

    const calcScore = useCallback(() => {
        //Check whether we have score
        if(rowsCleared > 0) {
            // The original tetris score calculation
            //since array values starts with 0 we needs to add or subtract 1
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared]);

    useEffect(() => {
        calcScore();

    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel];
};