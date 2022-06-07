
import './App.css';
import ResponsiveAppBar from './components/AppBar';
import Carrousel from './components/carrousel';
import "swiper/css/bundle";


function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Carrousel />
    </div>
  );
}

export default App;
