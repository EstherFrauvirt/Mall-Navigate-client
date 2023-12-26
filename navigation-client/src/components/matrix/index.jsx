import React, { useEffect, useState } from 'react'
import Deteils from '../details';
import Cube from './Cube';
import { Button, Stack } from '@mui/material';

export default function Matrix({ matrix, setElementCol, setElementRow ,setShow1,setShow2}) {

    //const [mat,setMat]=useState(mar)

    useEffect(() => {
        // printMat();
        console.log("hi");

    }, [])
 
    return (
        <>
            {matrix.map((row, indexR) => {
                return <Stack direction="row" >
                    {row.map((col, indexC) => {
                        // console.log(`${indexR},${indexC}  ===>  ${matrix[indexR][indexC]}`);
                        return <div onClick={() => {
                            console.log("onclick", indexR, indexC);
                            setElementCol(indexC);
                            setElementRow(indexR)
                            setShow1(true)
                            setShow2(true)

                        }}>
                                <Cube key={`${indexR},${indexC}`} title={matrix[indexR][indexC].name} color={matrix[indexR][indexC].color}/>                            
                        </div>
                    })}
                </Stack>
            })}
        </>
    )
}