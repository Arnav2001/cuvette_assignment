import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DeviceDetector from "../hooks/deviceDetector";
import { Discuss } from "react-loader-spinner";

const Chat = ({ id }) => {
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  const [trigger, setTrigger] = useState("");
  const [initials, setInitials] = useState("");
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const isMobile = DeviceDetector();
  const [loading,setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGroups();
    setTrigger("");
  }, [trigger, id]);

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
      setTrigger("submited");
      console.log("submittt", data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <div className="w-full h-full">
      {id === "" ? (
        <div className="w-full h-full flex flex-col items-center justify-between p-4">
          <div />
          <div className="flex flex-col items-center justify-center gap-[0.75rem] p-5">
            <img
              src="/assets/homeDefaultImg.svg"
              alt="Default Img"
              className="w-full"
            />
            <h1 className=" font-bold text-[50px] leading-[3.6619rem] tracking-2%">
              Pocket Notes
            </h1>
            <p className="text-[1.375rem] leading-2rem tracking-2% text-[#292929] font-roboto font-[500]">
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <img src="/assets/lock.svg" alt="Lock Image" />
            <p className="text-[#292929] tracking-2% font-roboto font-[400] leading-2rem">
              end-to-end encrypted
            </p>
          </div>
        </div>
      ) :<>
      {loading === true ?(
      <div className="w-full h-full flex justify-center items-center bg-[#ffffff]">
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
    ): (
        <div className="w-full h-full">
          <div className="bg-[#001F8B] w-full h-[10%] p-4 flex items-center gap-4">
            {isMobile === true && (
              <div className="">
                <FontAwesomeIcon className="text-white" icon={faArrowLeft} />
              </div>
            )}
            <div
              className=" flex justify-center items-center  rounded-[50%] w-[3.125rem] h-[3.125rem] text-white"
              style={{ backgroundColor: color }}
            >
              {initials}
            </div>
            <p className="text-white font-roboto font-[500] text-[1.2rem] leading-28.13px tracking-2%">{name}</p>
          </div>
          <div className=" w-full h-[60%] p-6 flex flex-col gap-4  overflow-auto">
            {chats.map((val, index) => (
              <div className="bg-white whitespace-pre-line shadow-custom p-5 rounded-md font-roboto font-[400] leading-28.83px track-3% text-[1.125rem]">
                {val.content}
                <div className="w-full flex justify-end pt-4 items-center gap-3 text-[#353535] font-roboto font-[500] text-[1.125rem] leading-17.58px tracking-2%">
                  {val.date}
                  <div className="w-[0.375rem] h-[0.375rem] rounded-[50%] bg-[#353535]"></div>
                  {val.time}
                </div>
              </div>
            ))}
          </div>
          <div className="w-[100%] h-[30%] bg-[#001F8B] p-4">
            <div className="w-[100%] h-[100%] bg-white rounded-md relative p-2">
              <textarea
                style={{ resize: "none" }}
                className="w-full active:border-none rounded-md focus:outline-none h-full p-2 placeholder:font-roboto placeholder:font-[400] placeholder:text-[1.8638rem] placeholder:leading-[34.94px] placeholder:tracking-[2%]"
                value={text}
                onChange={(e) => setText(e.target.value)}
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
      )}</>}
    </div>
  );
};

export default Chat;
