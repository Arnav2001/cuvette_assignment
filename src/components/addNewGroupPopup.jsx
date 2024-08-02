import React, { useState } from "react";
import { Discuss } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleCreate = () => {
    onCreateGroup("Group created successfully!");
    setIsPopUp(false);
  };
  const createNewGroupBtnHandler = async () => {
    setIsLoading(true);
    try {
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
      console.log("submittt", data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      handleCreate();
      // onCreateGroup("Group created successfully");
    }
  };
  return (
    <div
      onClick={() => setIsPopUp(false)}
      className="w-full h-full absolute top-0 left-0 bg-[#2F2F2F] bg-opacity-[75%] flex justify-center items-center"
    >
      <div
        className="bg-white  p-6 z-[1] relative w-[40%] h-[35%] rounded-md flex flex-col gap-5"
        style={{ pointerEvents: "auto" }}
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the background
      >
        <p className="font-roboto font-[500] text-[1.5rem] leading-46.45px tracking-3.5% w-full h-[20%]">
          Create New group
        </p>
        <div className="flex w-full h-[20%] gap-5">
          <p className="font-roboto font-[500] text-[1.5rem] leading-43.75px tracking-3.5% w-[30%] h-full flex items-center">
            Group Name
          </p>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className=" border-[#CCCCCC] border-2 rounded-[22px] w-[70%] h-full p-4 placeholder:font-roboto placeholder:text-[1.2rem] placeholder:font-[400] placeholder:leading-[36.84px] placeholder:tracking-3.5%"
            placeholder="Enter group name"
          />
        </div>
        <div className="flex gap-10 items-center">
          <p className="font-roboto font-[500] text-[1.5rem]">Choose colour</p>
          <div className="flex gap-3">
            {colors.map((color, index) => (
              <div
                key={index}
                className="rounded-[50%] h-[2vw] cursor-pointer w-[2vw]"
                style={{
                  backgroundColor: color,
                  borderWidth: "1px", // Set a border width
                  borderStyle: "solid", // Ensure the border is solid
                  borderColor:
                    selectedIndex === index ? "#000000" : "transparent", // Border color
                }}
                onClick={() => {
                  setSelectedIndex(index);
                  console.log(selectedIndex);
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div
            onClick={()=>{createNewGroupBtnHandler();}}
            className="bg-[#001F8B] pl-10 pr-10 pt-1 pb-1 flex cursor-pointer justify-center items-center rounded-[11px] text-white font-roboto font-[400] text-[1rem] leading-32.04px tracking-3.5%"
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
