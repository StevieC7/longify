import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Callback from './pages/Callback';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* do some routing here */}
      {/* should also include callback for Spotify auth */}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/callback' element={<Callback/>}></Route>
        <Route path='/make' element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
