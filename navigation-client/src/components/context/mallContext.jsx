import { createContext, useState, useEffect } from "react";

const MallContext = createContext()

const MallProvider = ({ children }) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [showStore, setShowStore] = useState();
  const [mall, setMall] = useState({
    name: "",
    placeId: "",
    coords: [],
  })
  const [store, setStore] = useState({
    name: "",
    leftCorner: {
      row: '',
      col: ''
    },
    size: {
      width: '',
      height: ''
    },
    doorCord: {
      row: '',
      col: ''
    },
    color: "",
    place_id: ""
  })
  const [storeArr, setStoreArr] = useState([])
  const [mallEnterArr, setMallEnterArr] = useState([])

  useEffect(()=>{
    console.log(mall);
    
  },[mall])


  const shared = { mall, setMall, 
    storeArr, setStoreArr, store, setStore,
     mallEnterArr, setMallEnterArr,
      width,height,setHeight,setWidth,
      showStore, setShowStore }
  return (
    <MallContext.Provider value={shared}>
      {children}
    </MallContext.Provider>
  )
}

export { MallProvider };

export default MallContext;