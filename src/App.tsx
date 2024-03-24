import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Locations from './Pages/Locations';
import ViewButton from './Components/ViewButton';


function App() {

  return (
    <>
    <Router>
        <div className='App'> 
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/locations' element={<Locations />} />
            </Routes>
        </div>
    </Router> 
    </>
    
  );
}

export default App;

