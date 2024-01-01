import { createContext, useState } from "react";

const MallContext = createContext()

const MallProvider = ({ children }) => {

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
  const shared = { mall, setMall, storeArr, setStoreArr, store, setStore, mallEnterArr, setMallEnterArr }
  return (
    <MallContext.Provider value={shared}>
      {children}
    </MallContext.Provider>
  )
}

export { MallProvider };

export default MallContext;