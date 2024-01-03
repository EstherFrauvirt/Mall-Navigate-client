import { createContext ,useState} from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});


  const shared = {user,setUser }
  return (
    <UserContext.Provider value={shared}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider }; 

export default UserContext;