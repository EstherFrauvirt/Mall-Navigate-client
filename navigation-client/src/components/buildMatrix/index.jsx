import React, { useState, useEffect, useContext } from 'react'
import Matrix from '../matrix'
import Details from '../details'
import { useLocation ,useNavigate} from 'react-router-dom';
import { Button, Card, Divider, Grid, Snackbar, Typography, useStepContext } from '@mui/material';
import { fetchData } from '../utils/servises'
import mallContext from '../context/mallContext'
import { StoreMallDirectory } from '@mui/icons-material';
import { Stack, border } from '@mui/system';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BuildMatrix({ handleCreateClick }) {
    const navigate = useNavigate()
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
    const [show, setShow] = useState()// הצגה של חלק האינפוט
    const [show2, setShow2] = useState()//הצגה של חלק הדלת
    const [showDoor, setShowDoor] = useState()
    const [showLeftCorner, setShowLeftCorner] = useState()
    const [showRU, setShowRU] = useState()
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
        const tmp = mat;//מטריצה 
        const tmpStore = {}//מידע על הכניסה(כמו חנות)
        const color = "gold";//צבע רקע
        const size = {}
        const leftCorner = {}
        leftCorner.row = elementRow;//נקודה שמאלית
        leftCorner.col = elementCol;
        size.row = 1;//גודל
        size.col = 1;
        console.log("enter-formData", formData);
        tmpStore.name = formData.name;//שם השער
        tmpStore.color = color;
        tmpStore.leftCorner = leftCorner
        tmpStore.size = size;
        tmpStore.border = "none"
        console.log("mall", mall);
        tmpStore.place_id = mall.placeId;
        const doorCord = {}
        doorCord.row = elementRow;
        doorCord.col = elementCol;
        setStore({ ...store, doorCord: doorCord })
        console.log(tmp);
        if (tmp[elementRow][elementCol].content == -1) {
            console.log("enter formData", formData.location);
            tmp[elementRow][elementCol].name = formData.type;
            tmp[elementRow][elementCol].color = color;
            tmp[elementRow][elementCol].content = 0;
            setMat([...tmp])
            console.log("final map", tmp);
            setShow2(false)
            setStoreArr((prevStoreArr) => [...prevStoreArr, tmpStore]);
        }
        else {
            handleClick1();

        }
    }
    const colorTheBorder = (borderStyle, formData) => {
        console.log("borderStyle", borderStyle);
        const tmpMat = mat;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if ((formData.location.row == i &&//נמצא בשורה מינימום
                    j >= formData.location.col &&//וגם הטור גדול מטור האפס
                    j <= (parseInt(formData.location.col) + parseInt(formData.width) - 1))//וגם הטור קטן מטור מקסימום
                    ||
                    (i == parseInt(formData.location.row) + parseInt(formData.height) - 1 &&//נמצא בשורת מקסימום
                        j >= formData.location.col &&//וגם הטור גדול מטור האפס
                        j <= (parseInt(formData.location.col) + parseInt(formData.width) - 1)) //וגם הטור קטן מטור מקסימום
                    ||
                    (j == formData.location.col &&//נמצא בטור מינמום
                        i >= formData.location.row &&//וגם גדול משורה מינמום
                        i < parseInt(formData.location.row) + parseInt(formData.height))//וגם קטן משורה מקסימום
                    ||
                    (j == parseInt(formData.location.col) + parseInt(formData.width) - 1 &&
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
        console.log(tmp);

        if (tmp[elementRow][elementCol].content == -1) {
            tmp[elementRow][elementCol].name = formData.type;
            tmp[elementRow][elementCol].color = "silver";
            tmp[elementRow][elementCol].content = 0;
            tmp[elementRow][elementCol].border = "none";
            setMat([...tmp])
            console.log("mallEnterArr", mallEnterArr);
        } else {
            handleClick1();

        }
    }
    const addDorToMAtrix = (formData) => {// הוספת דלת לחנות
        const tmp = mat
        if ((formData.enterance.row == formData.location.row &&//נמצא בשורה מינימום
            formData.enterance.col >= formData.location.col &&//וגם הטור גדול מטור האפס
            formData.enterance.col <= (parseInt(formData.location.col) + parseInt(formData.width)))//וגם הטור קטן מטור מקסימום
            ||
            (formData.enterance.row == parseInt(formData.location.row) + parseInt(formData.height) - 1 &&//נמצא בשורת מקסימום
                formData.enterance.col >= formData.location.col &&//וגם הטור גדול מטור האפס
                formData.enterance.col <= (parseInt(formData.location.col) + parseInt(formData.width))) //וגם הטור קטן מטור מקסימום
            ||
            (formData.enterance.col == formData.location.col &&//נמצא בטור מינמום
                formData.enterance.row >= formData.location.row &&//וגם גדול משורה מינמום
                formData.enterance.row < parseInt(formData.location.row) + parseInt(formData.height))//וגם קטן משורה מקסימום
            ||
            (formData.enterance.col == parseInt(formData.location.col) + parseInt(formData.width) - 1 &&
                formData.enterance.row >= formData.location.row &&//וגם גדול משורה מינמום
                formData.enterance.row < parseInt(formData.location.row) + parseInt(formData.height))//וגם קטן משורה מקסימום
        ) {
            tmp[formData.enterance.row][formData.enterance.col].content = 0;
            tmp[formData.enterance.row][formData.enterance.col].name = `door`;
            console.log("addDor", formData);
            setMat([...tmp])
            const doorCord = {}
            doorCord.row = formData.enterance.row;
            doorCord.col = formData.enterance.col;
            setStore({ ...store, doorCord: doorCord })
            console.log("store:", store);
            // setShow1(false)
            setShow2(false)
            setShowStore(true)
            console.log(store);
            colorTheBorder("none", formData)
            console.log("storeArr", storeArr);
        }
        else {
            handleClick2()
            setShowRU(false)
            setShowDoor(true)
            console.error("enter", formData.enterance.col, formData.enterance.row)
            console.error("loc", formData.location.col, formData.location.row)
            console.error("endline", formData.location.col + formData.width - 1, parseInt(formData.location.row) + parseInt(formData.height - 1))
            return
            // alert(formData.enterance.col +"  "+formData.enterance.row)
        }

    }

    const removeStore = (formData) => {
        const tmp = mat;
        let i = parseInt(formData.location.row)
        let j = parseInt(formData.location.col)
        
        const h = parseInt(i) + parseInt(formData.height);
        const w = parseInt(j) + parseInt(formData.width);
        for (let row = i; row < h; row++) {
            for (let col = j; col < w; col++) {
                tmp[row][col] = {
                    content: -1,
                    color: "white",
                    name: "",
                    border: "1px solid black"
                };
            }
        }
        setMat([...tmp])
        setShowRU(false)
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
        if (w > width || h > height) {
            handleClick();
            console.error("You exceed the boundaries of the surface");
            setShowDoor(false)
            setShowLeftCorner(true)
            return
        }
        // if(i+formData.height>height||j+formData.width>width)

        console.log("hereeeeee");

        for (let row = i; row < h; row++) {
            for (let col = j; col < w; col++) {
                if (tmp[row][col].content != -1) {
                    handleClick1();
                    console.error("the area is occupied please choose again");
                    setShowDoor(false)
                    setShowLeftCorner(true)
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
                        name: formData.name,
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
            console.log(x, tmpName)
            place++;
        }
        // console.log(tmp);
        setMat([...tmp])
        setStore({ ...tmpStore })
        console.log("store", tmpStore);
        colorTheBorder(`5px ridge ${color}`, formData)
        setShow2(true)

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
        console.log("mall:", mall);
        console.log("mat:" + mat);
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
        try{
            console.log({ mat });
            console.log(mallEnterArr);
            console.log("addMap");
            addMap()
            console.log("addStoreArr");
    
            addStoreArr()
            console.log("created");
            handleCreateClick();
            navigate("/created")
        }catch{
            alert("error")
        }
        
    }

    return (
        <>
            <Card style={{ minWidth: 275, width: "80%", marginTop: '5%', marginBottom: '5%', padding: '20px' }}>
                <Typography style={{
                    fontSize: '20px',
                    color: '#4a4cf5',
                    // maxWidth: '400px',
                    wordWrap: 'break-word', // Ensures the text doesn't overflow the container
                    textAlign: 'center'
                }}>
                    welcom to draw and design your mall map
                </Typography>
                <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <div style={{ alignContent: "left", width: "30%", marginBottom: '5%', marginRight: '5%' }}>
                        <Details
                            addStoreArr={addStoreArr}
                            addStoreToMatrix={addStoreToMatrix}
                            addDorToMAtrix={addDorToMAtrix}
                            addEntranceToMatrix={addEntranceToMatrix}
                            addPathToMatrix={addPathToMatrix}
                            elementRow={elementRow}
                            elementCol={elementCol}
                            show={show}
                            show2={show2}
                            setShow={setShow}
                            setShow2={setShow2}
                            showDoor={showDoor}
                            setShowDoor={setShowDoor}
                            setShowLeftCorner={setShowLeftCorner}
                            showLeftCorner={showLeftCorner}
                            showRU={showRU}
                            setShowRU={setShowRU}
                            removeStore={removeStore}
                        />
                        <Divider orientation="vertical" flexItem />

                    </div>
                    <div style={{ width: "70%", marginBottom: '5%', padding: '20px 0' }}>
                        <Stack alignItems="center">
                            <div id='matrix' style={{ height: '100vh', width: '100vh' }}>
                                <Matrix
                                    matrix={mat}
                                    setElementRow={setElementRow}
                                    setElementCol={setElementCol}
                                    setShow={setShow}
                                    setShow2={setShow2}
                                    heightmat={height}
                                    widthmat={width}
                                    width="200hv"
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
