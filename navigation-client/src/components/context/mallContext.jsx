import { createContext, useState } from "react";

const MallContext = createContext()

const MallProvider = ({ children }) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [showStore, setShowStore] = useState();
  const [mall, setMall] = useState({
    name: "",
    placeId: ""
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
  const [moduleH, setModuleH] = useState(1)
  const [moduleW, setModuleW] = useState(1)
  const shared = { mall, setMall, 
    storeArr, setStoreArr, store, setStore,
     mallEnterArr, setMallEnterArr,
      moduleH, setModuleH,moduleW, setModuleW,
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