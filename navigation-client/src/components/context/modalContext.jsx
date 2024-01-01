import { createContext ,useState} from "react";

const ModalContext = createContext()

const ModalProvider = ({ children }) => {

    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const shared = {handleClose,handleOpen,open }
  return (
    <ModalContext.Provider value={shared}>
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider }; 

export default ModalContext;