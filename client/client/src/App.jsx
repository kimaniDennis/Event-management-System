
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Sidebar from './Components/Sidebar'
import Dashboard from './Components/Dashboard'
import Eventform from './Components/Eventform'
import Welcome from './Components/Welcome'
import Logout from './Components/Logout'
import Settings from './Components/Settings'



function App() {
 return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
       <Route path="/login" element={<Login  />} />
        <Route path="/signup" element={<Signup  />} />
        <Route path='/eventform' element={<Eventform />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/settings' element={<Settings />} />
       
      </Routes>
    </Router>
  );
}



export default App


