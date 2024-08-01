import React, { useState } from 'react';

const AddNewGroupPopup = ({ setIsPopUp }) => {
  const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];
  const [name,setName] = useState('')
  const [selectedIndex,setSelectedIndex] = useState(-1)
  const createNewGroupBtnHandler = async() => {
    try {
      const body = { name,color:colors[selectedIndex] };
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
    }
    setIsPopUp(false);
  }
  return (
    <div
      onClick={() => setIsPopUp(false)}
      className='w-full h-full absolute top-0 left-0 bg-[#2F2F2F] bg-opacity-[75%] flex justify-center items-center'
    >
      <div
        className='bg-white  p-4 z-[1] relative'
        style={{ pointerEvents: 'auto' }}
        onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the background
      >
        <p>Create New group</p>
        <div className='flex'>
          <p>Group Name</p>
          <input type="text" onChange={(e)=>{setName(e.target.value)}} className='border border-[#CCCCCC] rounded-[22px]' />
        </div>
        <div className='flex'>
            <p>Choose Colour</p>
          {colors.map((color, index) => (
            <div
              key={index}
              className='rounded-[50%] h-[2vw] cursor-pointer w-[2vw]'
              style={{
                backgroundColor: color,
                borderWidth: '1px', // Set a border width
                borderStyle: 'solid', // Ensure the border is solid
                borderColor: selectedIndex === index ? '#000000' : 'transparent', // Border color
              }}
              onClick={()=>{setSelectedIndex(index); console.log(selectedIndex);}}
            />
          ))}
        </div>
        <div className='w-full flex justify-end'>
            <div onClick={createNewGroupBtnHandler} className='bg-[#001F8B] pl-6 pr-6 pt-1 pb-1 flex cursor-pointer justify-center items-center rounded-[11px] text-white'>Create</div>
        </div>
      </div>
    </div>
  );
};

export default AddNewGroupPopup;
