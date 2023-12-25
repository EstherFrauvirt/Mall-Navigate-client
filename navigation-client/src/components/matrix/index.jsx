import React, { useEffect, useState } from 'react'
import Deteils from '../details';
import Cube from './Cube';

export default function Matrix({matrix , width, height }) {

   //const [mat,setMat]=useState(mar)

    useEffect(() => {
            // printMat();
        console.log("hi");

    }, [])

    const printMat = () => {
        return matrix.map((row, indexR) => {
            return <div>
                {row.map((col, indexC) => {
                    console.log("printMat",`${indexR},${indexC}  ===>  ${matrix[indexR][indexC]}`);
                    return <Cube key={`${indexR},${indexC}`} title={matrix[indexR][indexC]} />
                })}
            </div>
        })
    }
    return (
        <>
            {/* {printMat()} */}
            { matrix.map((row, indexR) => {
            return <div>
                {row.map((col, indexC) => {
                    console.log(`${indexR},${indexC}  ===>  ${matrix[indexR][indexC]}`);
                    return <Cube key={`${indexR},${indexC}`} title={matrix[indexR][indexC]} />
                })}
            </div>
        })}
        </>
    )
}
