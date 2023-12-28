import { createContext, useState } from "react";

const MallContext = createContext()

const MallProvider = ({ children }) => {

  const [mall, setMall] = useState({
    name: "",
    placeId: ""
  })

  const [storeArr, setStoreArr] = useState([{
    name: "",
    leftCorner: {
      row: '',
      col: ''
    },
    size: 0,
    doorCord: {
      row: '',
      col: ''
    },
    color: "",
    place_id: ""
  }])

  const shared = { mall, setMall, storeArr, setStoreArr }
  return (
    <MallContext.Provider value={shared}>
      {children}
    </MallContext.Provider>
  )
}

export { MallProvider };

export default MallContext;