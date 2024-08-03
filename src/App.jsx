import Drawer from "./components/drawer";
import Chat from "./components/chat";
import { useEffect, useState } from "react";
import AddNewGroupPopup from "./components/addNewGroupPopup";
import DeviceDetector from "./hooks/deviceDetector";
import { Discuss } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [id, setId] = useState("");
  const [isPopUp, setIsPopUp] = useState(false);
  const isMobile = DeviceDetector();
  const [isDrawer, setIsDrawer] = useState(true);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          "https://cuvette-assignment-backend.onrender.com/groups"
        );
        const data = await response.json();
        
        setGroups(data);
      } catch (error) {
        
      }finally {
        setIsLoading(false); 
      }
    };

    fetchGroups();
  }, [isPopUp]);

  const handleCreateGroup = (message) => {
    toast.success(message); // Show toast notification
  };

  return (
    <div className="w-[100vw] flex h-[100vh] bg-[#DAE5F5] font-roboto relative">
    {isLoading ? (
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#ffffff]">
        <Discuss
          visible={true}
          height="80"
          width="80"
          ariaLabel="discuss-loading"
          wrapperStyle={{}}
          wrapperClass="discuss-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      </div>
    ) : isMobile ? (
      <>
        {isDrawer === true ? (
          <div className="w-full h-full">
            <Drawer
              groups={groups}
              setId={setId}
              setIsDrawer={setIsDrawer}
              setIsPopUp={setIsPopUp}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <Chat id={id} setIsDrawer={setIsDrawer} />
          </div>
        )}
      </>
    ) : (
      <>
        <div className="w-[30%] h-full">
          <Drawer
            groups={groups}
            setId={setId}
            setIsDrawer={setIsDrawer}
            setIsPopUp={setIsPopUp}
          />
        </div>

        <div className="w-[70%] h-full">
          <Chat id={id} setIsDrawer={setIsDrawer} />
        </div>
      </>
    )}

    {isPopUp && <AddNewGroupPopup setIsPopUp={setIsPopUp} onCreateGroup={handleCreateGroup}/>}
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  </div>
  );
}

export default App;
