import React, { useEffect, useState } from 'react'
import Deteils from '../details';
import Cube from './Cube';
import { Button, Stack } from '@mui/material';
import "./style.css"
export default function MatrixForShow({ matrix, setElementCol, setElementRow, setShow1, setShow2, heightmat, widthmat }) {

    //const [mat,setMat]=useState(mar)
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        // printMat();
        console.log("hi");

    }, [])

    return (
        <>
            {matrix.map((row, indexR) => {
                return <Stack direction="row" key={indexR} width="100%">
                    {row.map((col, indexC) => {
                        // console.log(`${indexR},${indexC}  ===>  ${matrix[indexR][indexC]}`);
                        return <div id='cube' key={indexC} style={{ width: `100/${widthmat}%` }} >

                            <Cube key={`${indexR},${indexC}`}
                                title={matrix[indexR][indexC].name}
                                color={matrix[indexR][indexC].color}
                                width={100 / widthmat}
                                height={100/heightmat}
                                index={indexC}
                                isClicked={isClicked}
                            />
                        </div>

                    })}
                </Stack>
            })}
        </>
    )
}
