import { createContext ,useState} from "react";

const ModalContext = createContext()

const ModalProvider = ({ children }) => {

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [role, setRole] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shared = {handleClose,handleOpen,open,role,setRole ,handleClose1,handleOpen1,open1}
  return (
    <ModalContext.Provider value={shared}>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider }; 

export default ModalContext;