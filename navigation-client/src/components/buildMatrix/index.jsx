import React, { useState, useEffect, useContext } from 'react'
import Matrix from '../matrix'
import Details from '../details'
import { useLocation } from 'react-router-dom';
import { Button, Card, Divider, Grid, Snackbar, useStepContext } from '@mui/material';
import { fetchData } from '../utils/servises'
import mallContext from '../context/mallContext'
import { StoreMallDirectory } from '@mui/icons-material';
import { Stack, border } from '@mui/system';
import "./style.css"
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BuildMatrix() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { mall, setStore, store, setStoreArr, storeArr, mallEnterArr, setMallEnterArr, setShowStore, width, height } = useContext(mallContext);
    // Get the height and width from the query parameters
    // let height = parseInt(searchParams.get('height'));//גובה המטריצה
    // let width = parseInt(searchParams.get('width'));//רוחב המטריצה

    console.log("build", height, width);
    const [mat, setMat] = useState([[]]);//מטריצה
    const [elementRow, setElementRow] = useState(0)//השורה של הלחיצה
    const [elementCol, setElementCol] = useState(0)//הטור של הלחיצה
    const [show1, setShow1] = useState()// הצגה של חלק האינפוט
    const [show2, setShow2] = useState()//הצגה של חלק הדלת

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const [open1, setOpen1] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(true);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
    };
    const [open2, setOpen2] = React.useState(false);

    const handleClick2 = () => {
        setOpen2(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen2(false);
    };

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
        console.log("final map", tmp);
        setShow1(false)
        setShow2(false)
        const doorCord = {
            row: formData.location.row,
            col: formData.location.col
        }
        setMallEnterArr([...mallEnterArr, { ...doorCord }]);
    }
    const colorTheBorder = (borderStyle,formData) => {
        console.log("borderStyle",borderStyle);
        const tmpMat = mat;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (( formData.location.row ==i &&//נמצא בשורה מינימום
                    j >= formData.location.col &&//וגם הטור גדול מטור האפס
                    j <= (parseInt(formData.location.col) + parseInt(formData.width)))//וגם הטור קטן מטור מקסימום
                    ||
                    (i == parseInt(formData.location.row) + parseInt(formData.height) - 1 &&//נמצא בשורת מקסימום
                        j >= formData.location.col &&//וגם הטור גדול מטור האפס
                        j <= (parseInt(formData.location.col) + parseInt(formData.width))) //וגם הטור קטן מטור מקסימום
                    ||
                    (j == formData.location.col &&//נמצא בטור מינמום
                        i >= formData.location.row &&//וגם גדול משורה מינמום
                        i < parseInt(formData.location.row) + parseInt(formData.height))//וגם קטן משורה מקסימום
                    ||
                    (j == parseInt(formData.location.col) + parseInt(formData.width) &&
                        i >= formData.location.row &&//וגם גדול משורה מינמום
                        i < parseInt(formData.location.row) + parseInt(formData.height))//וגם קטן משורה מקסימום
                ) {
                    // tmpMat[i][j].border = `10px ridge ${tmpMat[i][j].color}`
                    tmpMat[i][j].border = borderStyle
                    
                }
            }
        }
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
        if ((formData.enterance.row == formData.location.row &&//נמצא בשורה מינימום
            formData.enterance.col >= formData.location.col &&//וגם הטור גדול מטור האפס
            formData.enterance.col < (parseInt(formData.location.col) + parseInt(formData.width)))//וגם הטור קטן מטור מקסימום
            ||
            (formData.enterance.row == parseInt(formData.location.row) + parseInt(formData.height) - 1 &&//נמצא בשורת מקסימום
                formData.enterance.col >= formData.location.col &&//וגם הטור גדול מטור האפס
                formData.enterance.col < (parseInt(formData.location.col) + parseInt(formData.width))) //וגם הטור קטן מטור מקסימום
            ||
            (formData.enterance.col == formData.location.col &&//נמצא בטור מינמום
                formData.enterance.row >= formData.location.row &&//וגם גדול משורה מינמום
                formData.enterance.row < parseInt(formData.location.row) + parseInt(formData.height))//וגם קטן משורה מקסימום
            ||
            (formData.enterance.col == parseInt(formData.location.col) + parseInt(formData.width) &&
                formData.enterance.row >= formData.location.row &&//וגם גדול משורה מינמום
                formData.enterance.row < parseInt(formData.location.row) + parseInt(formData.height))//וגם קטן משורה מקסימום
        ) {
            console.log(formData.enterance.row, "==", formData.location.row)// &&//נמצא בשורה מינימום
            console.log(formData.enterance.col, ">=", formData.location.col)// &&//וגם הטור גדול מטור האפס
            console.log(formData.enterance.col, "<", parseInt(formData.location.col) + parseInt(formData.width) - 1)//וגם הטור קטן מטור מקסימום
            console.log("or");
            console.log(formData.enterance.row, "==", parseInt(formData.location.row) + parseInt(formData.height) - 1)//&&//נמצא בשורת מקסימום
            console.log(formData.enterance.col, ">=", formData.location.col)// &&//וגם הטור גדול מטור האפס
            console.log(formData.enterance.col, "<", (parseInt(formData.location.col) + parseInt(formData.width) - 1));
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
            setShowStore(true)
            console.log(store);
            colorTheBorder("none",formData)
        }
        else {
            handleClick2()
            console.error("enter", formData.enterance.col, formData.enterance.row)
            console.error("loc", formData.location.col, formData.location.row)
            console.error("endline", formData.location.col + formData.width - 1, parseInt(formData.location.row) + parseInt(formData.height - 1))
            return
            // alert(formData.enterance.col +"  "+formData.enterance.row)
        }

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
        tmpStore.border = "none"
        console.log("mall", mall);
        tmpStore.place_id = mall.placeId;

        const h = parseInt(i) + parseInt(formData.height);
        const w = parseInt(j) + parseInt(formData.width);
        console.log("ifi+j%", i, j);
        console.log("ifbuild%", height, width);
        if (h > width || h > height) {
            handleClick();
            console.error("You exceed the boundaries of the surface");
            return
        }
        for (let row = i; row < h; row++) {
            for (let col = j; col < w; col++) {
                if (tmp[row][col].content != -1) {
                    handleClick1();
                    console.error("the area is occupied please choose again");
                    return
                }
            }
        }
        // Iterate through the rectangle and mark each square with 1
        for (let row = i; row < h; row++) {
            for (let col = j; col < w; col++) {
                if (tmp[row][col].content == -1) {
                    tmp[row][col] = {
                        content: 1,
                        color: color,
                        name: " ",
                        border: "none"
                    };

                    // console.log("tmp", tmp);
                } else {
                    handleClick1();
                    console.error("the area is occupied please choose again");
                    return
                }
            }
        }
        const tmpName = formData.name
        console.log("tmpName", tmpName);

        const tmpRow = Math.floor(parseInt(i) + formData.height / 2);
        let tmpCol = Math.floor(parseInt(j) + formData.width / 2 - tmpName.length / 2)
        let endName = tmpName.length
        console.log("before", tmpCol, endName);
        if (tmpCol < formData.location.col) {
            tmpCol = parseInt(formData.location.col)
            endName = parseInt(formData.width)
            console.log("tmpCol", tmpCol, "endName", endName);

        }
        let place = 0;

        for (let x = tmpCol; x < (tmpCol + endName); x++) {
            console.log("x", x);
            console.log("tmpCol + endName", tmpCol + endName);
            tmp[tmpRow][x] = {
                content: 1,
                color: color,
                name: tmpName[place],
                border: "none",
            };
            console.log(x, tmpName[place])
            place++;
            console.log("zara", tmpRow, tmpCol, tmp[tmpRow][tmpCol])
        }
        // console.log(tmp);
        setMat([...tmp])
        setStore({ ...tmpStore })
        console.log("store", store);
        colorTheBorder(`5px ridge ${color}`,formData)

        // console.log("mat",mat);
    }

    useEffect(() => {
        console.log("height+width", height, width);
        const tmp = [];
        for (let index = 0; index < height; index++) {
            const tmp2 = [];
            for (let j = 0; j < width; j++) {
                tmp2[j] = { content: -1, name: " " }
            }
            tmp.push(tmp2);
        }
        setMat([...tmp])
    }, []);

    const addMap = () => {
        console.log(mall);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ mallMap: mat, place_id: mall.placeId, mallEnteranceArr: mallEnterArr })
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
        console.log({ mat });
        console.log(mallEnterArr);
        console.log("addMap");
        addMap()
        console.log("addStoreArr");

        addStoreArr()
        console.log("created");

    }

    return (
        <>
            <Card sx={{ minWidth: 275, width: "65%", left: '5%', marginTop: '', position: 'absolute', top: '25%', padding: '20px' }}>

                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <div>
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
                        <Divider orientation="vertical" flexItem />

                    </div>
                    <div id='matrix'>
                        <Stack alignItems="center">
                            <div id='matrix'>
                                <Matrix
                                    matrix={mat}
                                    setElementRow={setElementRow}
                                    setElementCol={setElementCol}
                                    setShow1={setShow1}
                                    setShow2={setShow2}
                                    heightmat={height}
                                    widthmat={width}
                                // width="200hv"
                                /></div></Stack>
                    </div>

                </Stack>
                <Stack alignItems="center">
                    <Button variant="contained" color="primary" onClick={addToDB} >
                        Create
                    </Button>
                </Stack>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        You exceed the boundaries of the surface
                    </Alert>
                </Snackbar>
                <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}>
                    <Alert onClose={handleClose1} severity="error" sx={{ width: '100%' }}>
                        the area is occupied please choose again
                    </Alert>
                </Snackbar>
                <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                    <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
                        The door is not at the boundary of the store
                    </Alert>
                </Snackbar>
            </Card>
        </>
    )
}
