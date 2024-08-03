import React, { useState } from "react";
import { Discuss } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeviceDetector from "../hooks/deviceDetector";

const AddNewGroupPopup = ({ setIsPopUp, onCreateGroup }) => {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];
  const [name, setName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = DeviceDetector();
  
  const handleCreate = () => {
    onCreateGroup("Group created successfully!");
    setIsPopUp(false);
  };
  const createNewGroupBtnHandler = async () => {
    try {
      if(name === ""){
        toast.error("Please provide group name");
      }
      if(selectedIndex === -1){
        toast.error("Please select profile colour");
      }
      else{
        setIsLoading(true);
      const body = { name, color: colors[selectedIndex] };
      const response = await fetch(
        `https://cuvette-assignment-backend.onrender.com/groups`,
        {
          method: "POST", // Use the correct HTTP method
          headers: {
            "Content-Type": "application/json", // header key
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setIsLoading(false);
      handleCreate();
    }
      
    } catch (error) {
        toast.error(error);
    }
  };
  return (
    <div
      onClick={() => setIsPopUp(false)}
      className="w-full h-full absolute top-0 left-0 bg-[#2F2F2F] bg-opacity-[75%] flex justify-center items-center"
    >
      <div
        className={isMobile === true?"bg-white p-4 z-[1] relative w-[80%] text-nowrap rounded-md flex flex-col gap-2":"bg-white  p-6 z-[1] relative w-[40%] h-[35%] rounded-md flex flex-col gap-5"}
        style={{ pointerEvents: "auto" }}
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the background
      >
        <p className={isMobile === true?"font-roboto font-[500] text-[1.125rem] leading-46.45px tracking-3.5% w-full h-[20%]":"font-roboto font-[500] text-[1.5rem] leading-46.45px tracking-3.5% w-full h-[20%]"}>
          Create New group
        </p>
        <div className="flex w-full h-[20%] items-center gap-5">
          <p className={isMobile === true?"font-roboto font-[500] text-[.875rem] leading-[1.4619rem] tracking-3.5% w-[30%] h-full flex items-center":"font-roboto font-[500] text-[1.5rem] leading-43.75px tracking-3.5% w-[30%] h-full flex items-center"}>
            Group Name
          </p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={isMobile === true ? " border-[#CCCCCC] border-2 rounded-[22px] w-[60%] h-full p-2 placeholder:font-roboto placeholder:text-[.875rem] placeholder:font-[400] placeholder:leading-[36.84px] placeholder:tracking-3.5%"
            :" border-[#CCCCCC] border-2 rounded-[22px] w-[70%] h-full p-4 placeholder:font-roboto placeholder:text-[1.2rem] placeholder:font-[400] placeholder:leading-[36.84px] placeholder:tracking-3.5%"}
            placeholder="Enter group name"
          />
        </div>
        <div className={isMobile === true? "flex items-center gap-2 mb-4":"flex gap-10 items-center"}>
          <p className={isMobile === true?"font-roboto font-[500] text-[.875rem]":"font-roboto font-[500] text-[1.5rem]"}>Choose colour</p>
          <div className={isMobile === true?  "flex gap-2":"flex gap-3"}>
            {colors.map((color, index) => (
              <div
                key={index}
                className={isMobile === true? "rounded-[50%] h-[5vw] cursor-pointer w-[5vw]":"rounded-[50%] h-[2vw] cursor-pointer w-[2vw]"}
                style={{
                  backgroundColor: color,
                  borderWidth: "1px", // Set a border width
                  borderStyle: "solid", // Ensure the border is solid
                  borderColor:
                    selectedIndex === index ? "#000000" : "transparent", // Border color
                }}
                onClick={() => {
                  setSelectedIndex(index);
                  
                }}
              />
            ))}
          </div>
        </div>
        <div className={isMobile === true?"w-full flex justify-center":"w-full flex justify-end"}>
          <div
            onClick={()=>{createNewGroupBtnHandler();}}
            className={isMobile === true ?"bg-[#001F8B] pl-10 pr-10 pt-1 pb-1 w-[70%] flex cursor-pointer justify-center items-center rounded-[11px] text-white font-roboto font-[400] text-[1rem] leading-32.04px tracking-3.5%"
            : "bg-[#001F8B] pl-10 pr-10 pt-1 pb-1 flex cursor-pointer justify-center items-center rounded-[11px] text-white font-roboto font-[400] text-[1rem] leading-32.04px tracking-3.5%"}
          >
            Create
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-[#ffffff]">
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
      )}
    </div>
  );
};

export default AddNewGroupPopup;
