import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

function Sidebar() {
    const [isOpen, setIsOpen]=useState(false)

    const ToggleSideBar=()=>{
        setIsOpen(!isOpen)
    }
    const CloseSideBar=()=>{
        setIsOpen(false)
    }
  return (
    <div className="fixed z-50 bg-white md:flex  md:fixed md:flex-col md:items-center  md:h-screen md:border md:border-r-1 w-[180px]  md:float-left md:border-gray-200 md:shadow-md">
        <div className="mt-3 ml-3 w-[0px]  md:hidden">
        <button onClick={ToggleSideBar} className="color-none">
            {!isOpen? <AiOutlineMenu />: <AiOutlineClose />}
     
      </button>
        </div>

        <div className={` h-screen ${isOpen? 'block' :'hidden'} md:flex md:flex-col `}>
        <div onClick={CloseSideBar}>
        <div className=" navlink flex items-center p-5 w-full">< span className="mr-3"><FaHome/></span><Link to="/">Home</Link></div>
        <div className="navlink flex items-center p-5 w-full"><span className="mr-3"><MdSpaceDashboard /></span><Link to="/dashboard">Dashboard</Link></div>
        <div className="navlink flex items-center p-5 w-full mt-2"><span className="mr-3"><LuLogIn /></span><Link to="/login">Login</Link></div>
        </div>
        </div>
    </div>
  )
}

export default Sidebar