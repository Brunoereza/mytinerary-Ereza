
import '../src/components/styles/App.css';
import ResponsiveAppBar from './components/AppBar';
// import Carrousel from './components/carrousel';
import "swiper/css/bundle";
import Footer from './components/Footer';
// import Cities from './components/pages/cities';
import {Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Cities from './components/pages/Cities';
import Details from './components/pages/Details'


function App() {
  return (
    <>
        <div className="App">
             <div className='nav'>
                 <ResponsiveAppBar />
                    {/* <Routes>
                      <Route path="cities" element={<Cities />} />
                    </Routes> */}
              </div>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cities' element={<Cities />} />
                <Route path='/cities/details/:id' element={<Details />} />
              </Routes>

               <Footer />
       </div>
    </>

  );
}

export default App;
