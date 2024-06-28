import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { LuLogIn } from "react-icons/lu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <div className='fixed z-50 bg-white md:flex md:fixed md:flex-col md:items-center md:h-screen md:border md:border-r-1 w-[180px] md:float-left md:border-gray-200 md:shadow-md'>
          <div className='mt-3 ml-3 w-[0px] md:hidden'>
                <button onClick={toggleSidebar} className='color-none'>
                    {!isOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
                    </button>
          </div>

          <div onClick={closeSidebar}>

          </div>
        </div>
    );
}

export default Sidebar;
