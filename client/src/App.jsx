import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Eventdetail from './Components/Eventdetail';
import Registration from './Components/Registration';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    
    <div className='flex'>
        <div><Sidebar/></div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/eventdetail' element={<Eventdetail />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
