import React, { useState, useEffect } from 'react'
import Matrix from '../matrix'
import Details from '../details'

export default function BuildMatrix({ width, height }) {
    const [mat, setMat] = useState([[]]);
    let tmp = [];

    // {
    //     height: '',
    //     width: '',
    //     name: '',
    //     location: { row: '', col: '' },
    //     entrance: { row: '', col: '' },
    //     type: 'store', // Default type
    // }

    const addElementToMatrix = (formData) => {
        const tmp = mat;
        console.log("tmp",tmp);
        console.log("formData",formData);
        //מאתחלים לפי הנתונים היבשים TEMP
        let i = formData.location.row
        let j = formData.location.col
        // Check if the starting point is within the matrix bounds
        if (i < 0 || i >= height || j < 0 || j >= width) {
            console.error('Starting point is outside the matrix bounds.');
            return;
        }

        // Iterate through the rectangle and mark each square with 1
        for (let row = i; row < Math.min(i + formData.height, height); row++) {
            for (let col = j; col < Math.min(j + formData.width, width); col++) {
                if (row == formData.enterance.row && col == formData.enterance.col){
                    tmp[row][col] = 0;
                    //keep the data of enterance point
                }
                  else{
                     tmp[row][col] = 1;
                  }  
               
            }
        }
        console.log(tmp);
        setMat([...tmp])
        // console.log("mat",mat);
    }

    useEffect(() => {
        for (let index = 0; index < height; index++) {
            const tmp2 = []
            for (let j = 0; j < width; j++) {
                tmp2.push(" ghjf")
            }
            tmp.push(tmp2)
        }
        setMat(tmp)
    }, [])

    
    console.log({mat});
    return (
        <>
            <Matrix matrix={mat} />
            <Details addElementToMatrix={addElementToMatrix} />
        </>
    )
}
