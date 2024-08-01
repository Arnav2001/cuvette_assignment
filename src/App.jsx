import Drawer from "./components/drawer";
import Chat from "./components/chat";
import { useEffect, useState } from "react";
import AddNewGroupPopup from "./components/addNewGroupPopup";
import DeviceDetector from "./hooks/deviceDetector";

function App() {
  const [id,setId] = useState('');
  const[isPopUp,setIsPopUp]= useState(false);
  const isMobile = DeviceDetector();
  const[isDrawer,setIsDrawer] = useState(true);
  const [groups,setGroups] = useState([]);
  useEffect(() => {
    const fetchGroups = async() => {
      try {
        const response = await fetch('https://cuvette-assignment-backend.onrender.com/groups')
      const data = await response.json();
      console.log(data);
      setGroups(data);

      } catch (error) {
        console.log(error);
      }
      
    }

    fetchGroups();

  }, [isPopUp])
  
  return (
    <div className="w-[100vw] flex h-[100vh] bg-[#DAE5F5] font-roboto relative">
     
    {isMobile === true?
    <>
    {
      isDrawer === true ? <div className="w-full h-full">
     <Drawer groups={groups} setId={setId} setIsDrawer={setIsDrawer} setIsPopUp={setIsPopUp}/>
     </div>:
     <div className="w-full h-full">
     <Chat id={id}/>
     </div>
     
    }
    </>:
    <>
    <div className="w-[30%] h-full">
      <Drawer groups={groups} setId={setId} setIsDrawer={setIsDrawer} setIsPopUp={setIsPopUp}/>
     </div>

     <div className="w-[70%] h-full">
      <Chat id={id}/>
      </div>
      </>
      }

{isPopUp === true && <AddNewGroupPopup setIsPopUp={setIsPopUp}/>}
    </div>
  );
}

export default App;
