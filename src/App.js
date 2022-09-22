import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Callback from './pages/Callback';
import Error from './pages/Error';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/make' element={<Main />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
