import React, { useEffect, useState } from 'react'
import { colors } from '../data';
import './popUpMenu.css';
const PopUpMenu = ({setBtnActive, setLengthOfGroup})=> {

    const [myList,setMyList] = useState([])
    const [index,setIndex]=useState(0);
    const [groupName,setGroupName] = useState('')

    useEffect(()=>{
        const list = JSON.parse(localStorage.getItem('groups'))||[];
        setMyList(list);
        
    },[])

    function capitalizeFirstLetter(str) {
        // Split the string into an array of words
        const words = str.split(' ');
        
        // Capitalize the first letter of each word
        const capitalizedWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        });
        if(capitalizedWords.length > 1){

        const initials = capitalizedWords[0][0]+capitalizedWords[1][0];
        // Join the words back into a string
        const capitalizedString = capitalizedWords.join(' ');
      
        return [initials,capitalizedString];
        }
        return [capitalizedWords[0][0], capitalizedWords[0]]
      }

      const storeLocally= (name,color) =>{
        if(name!==''){

            const textList = capitalizeFirstLetter(name);
        const initials = textList[0];
        const newName = textList[1];

        const newItem ={
            initials:initials,
            name:newName,
            color:color,
            chats:[]
        };

        const newList = [...myList,newItem];
        setLengthOfGroup(newList.length);
        localStorage.setItem('groups',JSON.stringify(newList));
        setMyList(newList);
        setBtnActive(false);}

      }

      const clickHandle = (event) => {
        if (!event.target.closest('#popUpBox')) {
          setBtnActive(false);
        }
      };

  return (

    <div id ='mainDiv' className='popMain-div' onClick={clickHandle}>
    <div id='popUpBox' className='popBox'>
        <div>
            <h2>Create New group</h2>
        </div>
        <div className='input-box'>
            <div>
                <h4>Group Name</h4>
            </div>
            <div className='text-div'>
                <input type="text" onChange={(e)=>setGroupName(e.target.value)} placeholder='Enter group name' />
            </div>
        </div>
        <div className='colors-div'>
            <div>
                <h4>Choose colour</h4>
            </div>
            <div className='colors-div'>
                {colors.map((color,map_index)=>(
                    <div className='color-div' onClick={()=>setIndex(map_index)} key={map_index} style={{backgroundColor:color,
                        borderColor: map_index === index ? 'black' : 'transparent',
                  borderWidth: '2px',
                  borderStyle: 'solid',}}/>
                ))}
            </div>
        </div>
        <div className='createBtn-div'>
            <div className='createBtn' onClick={()=>{storeLocally(groupName,colors[index])}}><h4>Create</h4></div>
        </div>
    </div>
    </div>

  )
}

export default PopUpMenu;