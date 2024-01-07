// import React, { useEffect, useState } from 'react';
// import Cube from './Cube';
// import { Button, Stack } from '@mui/material';

// export default function MatrixForShow({ matrix, heightmat, widthmat, path }) {
//     const [direction, setDirection] = useState(0);
//     // const [prevX, setPrevX] = useState(0);
//     // const [prevY, setPrevY] = useState(0);

//     const isInPath = (i, j) => {
//         let inPath = false;
//         const indexInPath = path.findIndex(([pathX, pathY]) => pathX === i && pathY === currentY);
//         if (indexInPath !== -1) {
//             inPath = true
//             if(indexInPath+1 === path.length)
//             {
//                 const [prevX, prevY] = path[indexInPath-1];
//                 if (prevX === i) {
//                     setDirection(currentY > prevY ? "KeyboardArrowDown" : "KeyboardArrowUp");
//                 } else if (prevY === currentY) {
//                     setDirection(i > prevX ? "KeyboardArrowRight" : "KeyboardArrowLeft");
//                 }
//             } else{

//             const [nextX, nextY] = path[indexInPath+1];
//             if (nextX === i) {
//                 setDirection(currentY > nextY ? "KeyboardArrowDown" : "KeyboardArrowUp");
//             } else if (nextY === currentY) {
//                 setDirection(i > nextX ? "KeyboardArrowRight" : "KeyboardArrowLeft");
//             }
//         }
//         }
//         return inPath;
//     };

//     // useEffect(() => {
//     //     // Update prevX and prevY after the render is complete
//     //     setPrevX(i);
//     //     setPrevY(currentY);
//     // }, [matrix, prevX, prevY]);

//     return (
//         <>
//             {matrix.map((row, indexR) => (
//                 <Stack direction="row" key={indexR} width="100%">
//                     {row.map((col, indexC) => {
//                         // const i = indexR;
//                         // const currentY = indexC;

//                         return (
//                             <div
//                                 id='cube'
//                                 key={indexC}
//                                 style={{ width: `100/${widthmat}%` }}
//                             >
//                                 <Cube
//                                     key={`${indexR},${indexC}`}
//                                     title={matrix[indexR][indexC].name}
//                                     color={matrix[indexR][indexC].color}
//                                     width={100 / widthmat}
//                                     height={100 / heightmat}
//                                     index={indexC}
//                                     icon={isInPath(indexR, indexC) ? direction : direction}
//                                 />
//                             </div>
//                         );
//                     })}
//                 </Stack>
//             ))}
//         </>
//     );
// }
import React, { useState, useEffect } from 'react';
import Cube from './Cube';
import { Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';



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
                        j > nextY ? row.push(<KeyboardArrowLeftIcon />) : row.push(<KeyboardArrowRightIcon />);
                    } else{
                        i > nextX ? row.push(<KeyboardArrowUpIcon />) : row.push(<KeyboardArrowDownIcon />);
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
