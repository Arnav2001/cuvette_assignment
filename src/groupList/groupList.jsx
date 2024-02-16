import React, { useEffect, useState } from 'react'
import './groupList.css'
const GroupList=({btnListener, setIndex, lengthOfGroup})=> {
  const [selectedIndex,setSelectedIndex]= useState(-1)

  const clickHandler = (index) =>{
    setIndex(index)
    setSelectedIndex(index)
  }

  const [groups,setGroups] = useState([])

  useEffect(()=>{
    const list = JSON.parse(localStorage.getItem('groups'))||[];
    setGroups(list);
  },[lengthOfGroup])

  return (
    <div className='groupMain-div'>
        <div className='heading-div'>
        <h1>Pocket Notes</h1>
        </div>
        <div className='groups-div'>
        {
          groups.map((group,index)=>(
            <div className='group-div' key={index} onClick={() => clickHandler(index)} 
            style={index === selectedIndex ?{backgroundColor:'rgba(47, 47, 47, 0.17)'}
            :{backgroundColor:'white'}}>

              <div className='initial-div' style={{backgroundColor:group.color}}>
                <h2>{group.initials}</h2>
              </div>
              <div className='name-div'>
                <p className='name'>{group.name}</p>
              </div>
            </div>
          ))
        }
        </div>
        <div className='btnCover-div'>
        <div className='btn-div' onClick={btnListener}>
          <h1 className='addBtn'> + </h1>
        </div>
        </div>
      </div>
  )
}

export default GroupList
