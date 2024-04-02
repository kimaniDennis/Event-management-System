import React from 'react'

function Dashboard() {
  return (
    <div className='grid mt-5 ml-[15%] w-full h-screen'>
        <div className="flex items-center justify-between h-[50px] w-full shadow-md mb-">
            <div className="flex items-center p-4 mr-[50px]">
                <img
                src='src/Images/userIcon.png'
                alt='user icon'
                className='w-[30px] h-[30px] mr-4'
                />
                <span>
                  <p>UserName...</p>
                </span>
            </div>
        </div>
          <div className="grid w-full h-[150px] mt-7  mb-[20px] grid-cols-4 gap-4">
            <div className='card flex p-1'>
              <div className='grid grid-cols-2 gap-3 w-full'>
                  <div className="w-full items-center flex flex-col justify-center">
                    <h1 className='text-center'>Total Events:</h1>
                  </div>
              </div>
            </div>
            <div className='card flex p-1'>
                <div  className="grid grid-cols-2 gap-3 w-full">
                  <div className="w-full items-center flex flex-col justify-center">
                     <h1 className='text-center'>Total Users:</h1>
                  </div>
                </div>
            </div>
          </div>
    </div>
  )
}

export default Dashboard