import React from 'react'
import './homePage.css'
const  HomePage=()=> {
  return (
    <div className='homeMain-div'>
        <img src="/assets/main_img.svg" alt="main img" width={500} height={500} />
        <h1>Pocket Notes</h1>
        <p>Send and receive messages without keeping your phone online.<br/>
Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
<div className='space-div'/>
<div className='bottom-bar'>
    <img className='lock' src="/assets/lock.svg" alt="lock" />
    <p className='endLine'>end-to-end encrypted</p>
</div>
    </div>
  )
}

export default HomePage;