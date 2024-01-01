import React, { useState, useEffect, useContext } from 'react'
import Matrix from '../matrix'
import Details from '../details'
import { useLocation } from 'react-router-dom';
import { Button, useStepContext } from '@mui/material';
import { fetchData } from '../utils/servises'
import mallContext from '../context/mallContext'
import { StoreMallDirectory } from '@mui/icons-material';

export default function BuildMatrix() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { mall, setStore, store, setStoreArr, storeArr, mallEnterArr, setMallEnterArr, moduleH, setModuleH, moduleW, setModuleW } = useContext(mallContext);
    // Get the height and width from the query parameters
    let height = parseInt(searchParams.get('height'));//גובה המטריצה
    let width = parseInt(searchParams.get('width'));//רוחב המטריצה

    console.log("build", height, width);
    const [mat, setMat] = useState([[]]);//מטריצה
    const [elementRow, setElementRow] = useState(0)//השורה של הלחיצה
    const [elementCol, setElementCol] = useState(0)//הטור של הלחיצה
    const [show1, setShow1] = useState()// הצגה של חלק האינפוט
    const [show2, setShow2] = useState()//הצגה של חלק הדלת

    function getRandomColor() {//צבע רנדומלי לרקע החנות
        // Generate random values for RGB components
        const red = Math.floor(Math.random() * 256);
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        // Construct the RGB color string
        const color = `rgb(${red}, ${green}, ${blue})`;
        return color;
    }

    const addEntranceToMatrix = (formData) => { //הוספץ כניסת קניון למטריצה
        console.log("enter formData", formData.location);
        const tmp = mat
        tmp[elementRow][elementCol].name = formData.type;
        tmp[elementRow][elementCol].color = "gold";
        tmp[elementRow][elementCol].content = 0;
        setMat([...tmp])
        setShow1(false)
        setShow2(false)
        const doorCord = {
            row: formData.location.row,
            col: formData.location.col
        }
        setMallEnterArr([...mallEnterArr, { ...doorCord }]);
    }

    const addPathToMatrix = (formData) => {//הוספת מעבר למטריצה
        const tmp = mat
        tmp[elementRow][elementCol].name = formData.type;
        tmp[elementRow][elementCol].color = "grey";
        tmp[elementRow][elementCol].content = 0;
        setMat([...tmp])
        setShow1(false)
        setShow2(false)
        console.log("mallEnterArr", mallEnterArr);
    }
    const addDorToMAtrix = (formData) => {// הוספת דלת לחנות
        const tmp = mat
        console.log(formData);
        tmp[formData.enterance.row][formData.enterance.col].content = 0;
        tmp[formData.enterance.row][formData.enterance.col].name = `door`;
        console.log("addDor", formData);
        setMat([...tmp])
        const doorCord = {}
        doorCord.row = formData.enterance.row;
        doorCord.col = formData.enterance.col;
        setStore({ ...store, doorCord })
        setShow1(false)
        setShow2(false)
        console.log(store);

    }
    const addStoreToMatrix = (formData) => {
        const tmp = mat;
        const tmpStore = {}
        const color = getRandomColor();
        console.log("tmp", tmp);
        console.log("formData", formData);
        let i = parseInt(formData.location.row)
        let j = parseInt(formData.location.col)
        const size = {}
        const leftCorner = {}
        leftCorner.row = formData.location.row;
        leftCorner.col = formData.location.col;
        size.row = formData.height;
        size.col = formData.width;
        console.log(color, formData.name, formData.location.row, formData.location.col);
        tmpStore.name = formData.name;
        tmpStore.color = color;
        tmpStore.leftCorner = leftCorner
        tmpStore.size = size;
        console.log("mall", mall);
        tmpStore.place_id = mall.placeId;

        // Check if the starting point is within the matrix bounds
        if (i < 0 || i >= height || j < 0 || j > width) {
            console.log("ifi+j%", i, j);
            console.log("ifbuild%", height, width);
            console.error('Starting point is outside the matrix bounds.');
            return;
        }
        const h = parseInt(i) + parseInt(formData.height)/moduleH;
        const w = parseInt(j) + parseInt(formData.width)/moduleW;
        console.log("ifi+j%", i, j);
        console.log("ifbuild%", height, width);
        console.log("MOdule%", moduleH, moduleW);
        // Iterate through the rectangle and mark each square with 1
        for (let row = i; row < h; row++) {
            for (let col = j; col < w; col++) {
                if (tmp[row][col].content == -1) {
                    tmp[row][col] = {
                        content: 1,
                        color: color,
                        name: formData.name,
                    };

                    // console.log("tmp", tmp);
                } else {
                    console.error("the area is occupied please choose again");
                    return
                }
            }
        }
        // console.log(tmp);
        setMat([...tmp])
        setStore({ ...tmpStore })
        console.log("store", store);

        // console.log("mat",mat);
    }

    useEffect(() => {
        if (height > 12 || width > 12) {

            setModuleH(height / 12)
            setModuleW(height / 12)
        }
        console.log("build%", height, width);
        const tmp = [];
        for (let index = 0; index < height/moduleH; index++) {
            const tmp2 = [];
            for (let j = 0; j < width/moduleW; j++) {
                tmp2[j] = { content: -1, name: "o" }
            }
            tmp.push(tmp2);
        }
        setMat([...tmp])
        console.log("build%", moduleH, moduleW);
    }, []);

    const addMap = () => {
        console.log(mall);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ map: mat, place_id: mall.placeId, mallEnteranceArr: mallEnterArr })
        };
        fetchData("maps", requestOptions)
            .then((data => { console.log(data); }))
            .catch((err => console.log(err)))
    }

    const addStoreArr = () => {
        console.log("storeArr", storeArr);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(storeArr)
        };
        fetchData("store", requestOptions)
            .then((data => { console.log(data); }))
            .catch((err => console.log(err)))
    }



    const addToDB = () => {
        console.log(mallEnterArr);
        console.log("addMap");
        addMap()
        console.log("addStoreArr");

        addStoreArr()
        console.log("created");

    }
    console.log({ mat });
    return (
        <>
            <Button variant="contained" color="primary" onClick={addToDB}>
                Create
            </Button>
            <Matrix
                matrix={mat}
                setElementRow={setElementRow}
                setElementCol={setElementCol}
                setShow1={setShow1}
                setShow2={setShow2} />
            <Details
                addStoreArr={addStoreArr}
                addStoreToMatrix={addStoreToMatrix}
                addDorToMAtrix={addDorToMAtrix}
                addEntranceToMatrix={addEntranceToMatrix}
                addPathToMatrix={addPathToMatrix}
                elementRow={elementRow}
                elementCol={elementCol}
                show1={show1}
                show2={show2}
                setShow1={setShow1}
                setShow2={setShow2}
            />
        </>
    )
}
