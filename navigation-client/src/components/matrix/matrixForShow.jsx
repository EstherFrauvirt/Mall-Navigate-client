
import React, { useState, useEffect } from 'react';
import Cube from './Cube';
import { Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';



export default function MatrixForShow({ matrix, heightmat, widthmat, path }) {
    const pathMatrix = [];


    const createMatrixPath = () => {
        for (let i = 0; i < heightmat; i++) {
            const row = [];
    
            for (let j = 0; j < widthmat; j++) {
                const indexInPath = path.findIndex(([pathX, pathY]) => pathX === i && pathY === j);
    
                if (indexInPath !== -1 && indexInPath !== path.length - 1) {
                    let [nextX, nextY] = path[indexInPath + 1];
                    if (matrix[i][j].name === 'door'){
                        row.push(null);
                    }else if (nextX === i) {
                        j > nextY ? row.push(<KeyboardArrowLeftIcon style={{ color: 'red' }}/>) : row.push(<KeyboardArrowRightIcon style={{ color: 'red' }}/>);
                    } else{
                        i > nextX ? row.push(<KeyboardArrowUpIcon style={{ color: 'red' }}/>) : row.push(<KeyboardArrowDownIcon style={{ color: 'red' }}/>);
                    }
                }else {
                    row.push(null);
                }
            }
            pathMatrix.push(row);
        }
        console.log(pathMatrix);
    };
    

    createMatrixPath()

    return (
        <>
            {matrix.map((row, indexR) => (
                <Stack direction="row" key={indexR} width="100%">
                    {row.map((col, indexC) => (
                        <div
                            id='cube'
                            key={indexC}
                            style={{ width: `100/${widthmat}%` }}
                        >
                            <Cube
                                key={`${indexR},${indexC}`}
                                title={matrix[indexR][indexC].name}
                                color={matrix[indexR][indexC].color}
                                width={100 / widthmat}
                                height={100 / heightmat}
                                index={indexC}
                                icon={pathMatrix[indexR] [indexC]}
                            />
                        </div>
                    ))}
                </Stack>
            ))}
        </>
    );
}
