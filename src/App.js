
import './App.css';
import HomePage from './homePage/homePage';
import GroupList from './groupList/groupList';
import { useEffect, useState } from 'react';
import Chat from './chat/chat';
import PopUpMenu from './popUpMenu/popUpMenu';

function App() {
  const [index,setIndex] = useState(-1);
  const [btnActive,setBtnActive]= useState(false);
  const [lengthOfGroup,setLengthOfGroup] = useState(0);
  const [groups,setGroups]= useState([])
  const [groupUpdate, setGroupUpdate] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(()=>{
    const list = JSON.parse(localStorage.getItem('groups'))||[];
    setGroups(list);
    setIsMobile(window.innerWidth <= 768);
  },[lengthOfGroup,groupUpdate])

  const btnListener = () =>{
    setBtnActive(true);
  }

  return (
    <>
    { isMobile === true ? 
    <>
    { index === -1 ? <>
      {btnActive && <PopUpMenu setBtnActive={setBtnActive} setLengthOfGroup={setLengthOfGroup}/>}
      <GroupList btnListener={btnListener} setIndex={setIndex} lengthOfGroup={lengthOfGroup}/>
      </> :
      <Chat groups={groups} index={index} setGroupUpdate={setGroupUpdate} isMobile={isMobile} setIndex={setIndex}/>
    }
  </>:
    <div className='body'>
    {btnActive && <PopUpMenu setBtnActive={setBtnActive} setLengthOfGroup={setLengthOfGroup}/>}
  <GroupList btnListener={btnListener} setIndex={setIndex} lengthOfGroup={lengthOfGroup}/>
  {index === -1 ? <HomePage/>:<Chat groups={groups} index={index} setGroupUpdate={setGroupUpdate}/>}
  </div>
  }
    </>
  );
}

export default App;
