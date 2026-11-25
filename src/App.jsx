
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Explore from './pages/Explore';
import DestinationDetails from './pages/DestinationDetails';
import Experiences from './pages/Experiences';
import NotFound from './pages/NotFound';
import About from './pages/About';
import './App.css';
import Header from './components/Header/Header';


function App() {
  return (
    <div className='app'>

      <Header />
      
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:id" element={<DestinationDetails />}/>
          <Route path="/experiences" element={<Experiences />}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
      
  );
}

export default App;
