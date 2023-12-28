import { createContext ,useState} from "react";

const MallContext = createContext()

const MallProvider = ({ children }) => {

    const [mall, setMall] = useState({
        name: ""
      })

  const shared = { mall,setMall }
  return (
    <MallContext.Provider value={shared}>
      {children}
    </MallContext.Provider>
  )
}

export { MallProvider }; 

export default MallContext;