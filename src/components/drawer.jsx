import React, { useState } from 'react'

const Drawer = ({setIsPopUp,setId,setIsDrawer,groups}) => {
   
    const [selectedIndex, setselectedIndex] = useState(-1);

  return (
    <div className='h-full w-full flex flex-col items-center bg-[#FFFFFF]'>
        <div className='w-full h-[11%]'>
        <h1 className=' font-roboto font-[500] text-[2.1875rem] leading-2.5638rem tracking-2% w-full h-full flex justify-center items-center'>
            Pocket Notes
        </h1>
        </div>

        <div className='w-full h-full relative'>
            <div className='w-full h-[100%] absolute overflow-auto scrollbar-thin rounded-md scrollbar-track-gray-200 scrollbar-thumb-white'>
                {
                    groups.map((group,index)=>(
                        <div key={index} onClick={()=>{setselectedIndex(index); setIsDrawer(false); setId(group._id)}} className='w-full p-3 items-center flex gap-6 justify-center hover:bg-[#2F2F2F] hover:bg-opacity-[17%] cursor-pointer rounded-xl' style={{backgroundColor:selectedIndex === index?'rgba(47, 47, 47, 0.17)':null,}}>
                            <div className='w-[70%] flex items-center gap-4'>
                            <div className='rounded-[50%] h-[3vw] justify-center items-center w-[3vw] text-white p-4 flex ' style={{backgroundColor:group.color}}>
                               {group.initials}
                            </div>
                            <div className='font-roboto font-[500] text-[1.2rem] leading-1.7581rem tracking-2% truncate'>
                                {group.name}
                            </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div onClick={()=>{setIsPopUp(true)}} className='absolute bottom-0 h-[5vw] sm:text-[3.125rem] text-[2.5rem] w-[5vw] right-0 flex justify-center items-center bg-[#16008B] md:text-[3.125rem] lg:text-[4.375rem] cursor-pointer leading-4.2737rem tracking-2% text-white rounded-[50%] p-6 mb-5 mr-7'>
                +
            </div>
        </div>
    </div>
  )
}

export default Drawer