import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DeviceDetector from "../hooks/deviceDetector";

const Chat = ({ id }) => {
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [trigger,setTrigger] = useState('');
  const [initials,setInitials] = useState('');
  const [name,setName] = useState('');
  const [color,setColor] = useState('');
  const isMobile = DeviceDetector();
  
  useEffect(() => {
    console.log("idddd", id);
    const fetchGroups = async () => {
      try {
        const response = await fetch(
          `https://cuvette-assignment-backend.onrender.com/group/${id}`
        );
        const data = await response.json();
        console.log("chattttttt", data);
        setChats(data.chats);
        setInitials(data.initials);
        setName(data.name);
        setColor(data.color);

      } catch (error) {
        console.log(error);
      }
    };

    fetchGroups();
    setTrigger('');
  }, [trigger,id]);

  const submitChat = async () => {
    try {
      const body = { content: text };
      const response = await fetch(
        `https://cuvette-assignment-backend.onrender.com/chats/${id}`,
        {
          method: "PATCH", // Use the correct HTTP method
          headers: {
            "Content-Type": "application/json", // header key
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setText("");
      setTrigger('submited');
      console.log("submittt", data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full">
      {id === "" ? (
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div />
          <div className="flex flex-col items-center justify-center gap-[12px]">
            <img src="/assets/homeDefaultImg.svg" alt="Default Img" />
            <h1 className=" font-bold text-[50px] leading-[3.6619rem] tracking-2%">
              Pocket Notes
            </h1>
            <p className="text-[1.375rem] leading-32px tracking-2% text-[#292929]">
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <img src="/assets/lock.svg" alt="Lock Image" />
            <p className="text-[#292929] tracking-2% font-normal leading-32px">
              end-to-end encrypted
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="bg-[#001F8B] h-[10%] p-4 flex items-center gap-4">
           {isMobile === true && <div className="">
              <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
            </div>}
            <div className=" flex justify-center items-center  rounded-[50%] w-[5vw] h-[5vw] text-white"
            style={{backgroundColor:color}}>
              {initials}
            </div>
            <p className="text-white">{name}</p>
          </div>
          <div className=" w-full h-[60%] p-4 flex flex-col gap-4  overflow-auto">
            {chats.map((val, index) => (
              <div className="bg-white whitespace-pre-line shadow-custom p-4 rounded-md">
                {val.content}
                <div className="w-full flex justify-end pt-4 items-center gap-2 text-[#353535]">
                  {val.date}
                  <div className="w-[4px] h-[4px] rounded-[50%] bg-[#353535]"></div>
                  {val.time}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-[30%] bg-[#001F8B] p-4">
            <div className="w-full h-full bg-white rounded-md relative">
              <textarea
                style={{ resize: "none" }}
                className="w-full active:border-none rounded-md focus:outline-none h-full p-4"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder="Enter your text here......"
              ></textarea>
              <div className="absolute bottom-0 p-4 right-0">
                {text === "" ? (
                  <img
                    src="/assets/disableSendImg.svg"
                    alt="Disable Send Button"
                  />
                ) : (
                  <img
                    src="/assets/activeSendImg.svg"
                    className=" cursor-pointer"
                    onClick={submitChat}
                    alt="Active Send Button"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
