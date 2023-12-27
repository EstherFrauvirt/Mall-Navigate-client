import React, { useState, useEffect } from 'react'
import Matrix from '../matrix'
import Details from '../details'
import { useLocation } from 'react-router-dom';
import { Button, useStepContext } from '@mui/material';
import {fetchData} from '../utils/servises'

export default function BuildMatrix() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Get the height and width from the query parameters
    let height = parseInt(searchParams.get('height'));
    let width = parseInt(searchParams.get('width'));
    console.log("build", height, width);
    const [mat, setMat] = useState([[]]);
    let module = 1;
    const [elementRow, setElementRow] = useState(0)
    const [elementCol, setElementCol] = useState(0)
    const [show1, setShow1] = useState()
    const [show2, setShow2] = useState()

    function getRandomColor() {
        // Generate random values for RGB components
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);

        // Construct the RGB color string
        const color = `rgb(${red}, ${green}, ${blue})`;

        return color;
    }
    const addPathToMatrix = (formData) => {
        const tmp = mat
        tmp[elementRow][elementCol].name = formData.type;
        tmp[elementRow][elementCol].color = "grey";
        tmp[elementRow][elementCol].content = 0;
        setMat([...tmp])
        setShow1(false)
        setShow2(false)


    }
    const addDorToMAtrix = (formData) => {
        const tmp = mat
        console.log(formData);

        tmp[formData.enterance.row][formData.enterance.col].content = 0;
        tmp[formData.enterance.row][formData.enterance.col].name = `door`;
        console.log("addDor", formData);
        setMat([...tmp])
        setShow1(false)
        setShow2(false)
    }
    const addStoreToMatrix = (formData) => {
        const tmp = mat;
        const color = getRandomColor();
        console.log("tmp", tmp);
        console.log("formData", formData);
        let i = parseInt(formData.location.row)
        let j = parseInt(formData.location.col)
        // i=i/module
        // j=j/module
        // console.log("module", module);
        console.log("i+j%", i, j);
        console.log("build%", height, width);

        // Check if the starting point is within the matrix bounds
        if (i < 0 || i >= height || j < 0 || j > width) {
            console.log("ifi+j%", i, j);
            console.log("ifbuild%", height, width);
            console.error('Starting point is outside the matrix bounds.');
            return;
        }
        const h = parseInt(i) + parseInt(formData.height);
        const w = parseInt(j) + parseInt(formData.width);
        // Iterate through the rectangle and mark each square with 1
        for (let row = i; row < h; row++) {
            for (let col = j; col < w; col++) {
                if (tmp[row][col].content == -1) {
                    tmp[row][col] = {
                        content: 1,
                        color: color,
                        name: formData.name,
                    };

                    console.log("tmp", tmp);
                } else {
                    console.error("the area is occupied please choose again");
                    return
                }
            }
        }
        console.log(tmp);
        setMat([...tmp])
        // console.log("mat",mat);
    }

    useEffect(() => {
        // if (height > 100 || width > 100) {
        //     height = height / 20;
        //     width = width / 20
        //     module = 20
        // } else if (height > 30 || width > 30) {
        //     height = height / 10;
        //     width = width / 10
        //     module = 10
        // }
        // console.log("build%", height, width);
        const tmp = [];
        for (let index = 0; index < height; index++) {
            const tmp2 = [];
            for (let j = 0; j < width; j++) {
                tmp2[j] = { content: -1, name: "o" }
            }
            tmp.push(tmp2);
        }
        setMat([...tmp])
    }, []);

const addMap=()=>{
    const requestOptions = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: {map:mat,place_id:"g"}
  };
    fetchData("maps",)
}
    console.log({ mat });
    return (
        <>
            <Matrix matrix={mat} setElementRow={setElementRow} setElementCol={setElementCol} setShow1={setShow1} setShow2={setShow2} />
            <Details addStoreToMatrix={addStoreToMatrix} elementRow={elementRow} elementCol={elementCol} addDorToMAtrix={addDorToMAtrix} show1={show1} show2={show2} setShow1={setShow1} setShow2={setShow2} addPathToMatrix={addPathToMatrix} />
            <Button variant="contained" color="primary" onClick={addMap()}>
                Create
            </Button>
        </>
    )
}
