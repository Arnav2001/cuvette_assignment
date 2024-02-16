import React, {useEffect, useState } from 'react';
import './chat.css'
const Chat = ({ groups,index,setGroupUpdate, isMobile, setIndex }) => {
  const [text, setText] = useState('');
  const [chats,setChats] = useState([]);
  const [initial,setInitial] = useState('')
  const [name,setName] = useState('')
  const [color,setColor] = useState('')

  useEffect(()=>{
    
    setChats(groups[index].chats || []);
    setInitial(groups[index].initials);
    setName(groups[index].name);
    setColor(groups[index].color);

  },[groups,index])


  const storeLocally = () => {
    const currentDateTime = new Date(); 
  const Time = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const date = currentDateTime.toLocaleDateString('en-US', { day: 'numeric' });
  const month = currentDateTime.toLocaleDateString('en-US', { month: 'long' });
  const year = currentDateTime.toLocaleDateString('en-US', {year: 'numeric' });
  const newChat = {
    msg: text,
    date: date+' '+month+' '+year,
    time: Time,
  };

  const updatedGroups = [...groups]; // Create a copy of the groups array

  // Create a copy of the chats array for the specific group
  const updatedChats = [...updatedGroups[index].chats, newChat];

  // Update the chats for the specific group in the copied array
  updatedGroups[index] = {
    ...updatedGroups[index],
    chats: updatedChats,
  };

  // Update the state with the new copy of groups
  setChats(updatedChats);
  setGroupUpdate(updatedGroups);
  localStorage.setItem('groups', JSON.stringify(updatedGroups));
  setText('');
};


  return (
    <div className='chatMain-div'>
      <div className='chat-heading'>
      {isMobile && <img className='backArrow' onClick={()=> setIndex(-1)} src="/assets/back_arrow.svg" alt="" />}
        <div className='chat-initial-div' style={{backgroundColor:color}}>
          <h2>{initial}</h2>
        </div>
        <div>
          <h4>{name}</h4>
        </div>
      </div>
      <div className='chats'>
        {chats.map((chating, index) => (
          <div className='chatbox' key={index}>
            <p>{chating.msg}</p>
            <div className='date-time'>
            <p>{chating.date}</p>
            <div className='dot'></div>
            <p>{chating.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='chatBottom-div'>
        <div className='comment-div'>
          <textarea type="text" value={text} placeholder='Enter your text here..........' onChange={(event) => setText(event.target.value)} />
          <div className='select-div'>
          {text !== '' ? (
            <img className='btn' onClick={storeLocally} src="/assets/blue_send.svg" alt="submit button" />
          ) : (
            <img src="/assets/grey_send.svg" alt="submit button" />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
