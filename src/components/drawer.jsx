import React, { useState } from 'react'

const Drawer = ({setIsPopUp,setId,setIsDrawer,groups}) => {
   
    const [selectedIndex, setselectedIndex] = useState(-1);

  return (
    <div className='h-full w-full flex flex-col items-center bg-[#FFFFFF]'>
        <div>
        <h1 className=' font-[500] text-[2.1875rem] leading-41.02px tracking-2%'>
            Pocket Notes
        </h1>
        </div>

        <div className='w-full h-full relative'>
            <div className='w-full h-[100%] absolute overflow-auto'>
                {
                    groups.map((group,index)=>(
                        <div key={index} onClick={()=>{setselectedIndex(index); setIsDrawer(false); setId(group._id)}} className='w-full p-4 items-center flex justify-center gap-4 hover:bg-[#2F2F2F] hover:bg-opacity-[17%] cursor-pointer rounded-md' style={{backgroundColor:selectedIndex === index?'rgba(47, 47, 47, 0.17)':null,}}>
                            <div className='rounded-[50%] text-white p-4' style={{backgroundColor:group.color}}>
                                {group.initials}
                            </div>
                            <div>
                                {group.name}
                            </div>
                        </div>
                    ))
                }
            </div>
            <div onClick={()=>{setIsPopUp(true)}} className='absolute bottom-0 h-[7vw] w-[7vw] right-0 flex justify-center items-center bg-[#16008B] text-[4.375rem] cursor-pointer leading-68.38px tracking-2% text-white rounded-[50%]'>
                +
            </div>
        </div>
    </div>
  )
}

export default Drawer