import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Eventdetail from './Components/Eventdetail';
import Registration from './Components/Registration';
import Sidebar from './Components/Sidebar';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
  };

  return (

      <div className='d flex'>
        {isAuthenticated ? (
          <div className='flex px-7 ml-[15%]'>
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/eventdetail' element={<Eventdetail />} />
              <Route path='/registration' element={<Registration />} />
              <Route path='/login'  element={<Login />} />
            </Routes>
          </div>
        ) : (
          <Home onLogin={handleLogin} onSignup={handleSignup} />
        )}
      </div>

  );
}

export default App;
