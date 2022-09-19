import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* do some routing here */}
      {/* should also include callback for Spotify auth */}
      <Route path='/'></Route>
      <Route path='/callback'></Route>
    </div>
  );
}

export default App;
