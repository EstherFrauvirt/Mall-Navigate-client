import React, { useEffect, useState } from 'react'
import Deteils from '../details';
import Cube from './Cube';
import { Stack } from '@mui/material';

export default function Matrix({matrix , width, height ,setElementCol,setElementRow }) {

   //const [mat,setMat]=useState(mar)

    useEffect(() => {
            // printMat();
        console.log("hi");

    }, [])

    const printMat = () => {
        return matrix.map((row, indexR) => {
            return <div>
                {row.map((col, indexC) => {
                    // console.log("printMat",`${indexR},${indexC}  ===>  ${matrix[indexR][indexC]}`);
                    return <Cube key={`${indexR},${indexC}`} title={matrix[indexR][indexC]} />
                })}
            </div>
        })
    }
    return (
        <>
            {/* {printMat()} */}
            { matrix.map((row, indexR) => {
            return <Stack direction="row" >
                {row.map((col, indexC) => {
                    // console.log(`${indexR},${indexC}  ===>  ${matrix[indexR][indexC]}`);
                    return<div onClick={()=>{setElementCol(indexC);setElementRow(indexR)}}> <Cube key={`${indexR},${indexC}`} title={matrix[indexR][indexC]} row={indexR} col={indexC} /></div>
                })}
            </Stack>
        })}
        </>
    )
}
