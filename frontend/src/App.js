
import '../src/components/styles/App.css';
import ResponsiveAppBar from './components/AppBar';
// import Carrousel from './components/carrousel';
import "swiper/css/bundle";
import Footer from './components/Footer';
// import Cities from './components/pages/cities';
import {Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Cities from './components/pages/Cities';
import Details from './components/pages/Details';
import {connect} from "react-redux"
import {useEffect} from "react"
import citiesActions from "./redux/actions/citiesActions"
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SnackBar from './components/SnackBar';


function App(props) {
  useEffect (()=>{
    props.getCities()
    // eslint-disable-next-line
  },[])
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
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/signup' element={<SignUp/>} />
              </Routes>
              <SnackBar/>
               <Footer />
       </div>
    </>

  );
}
const mapDispatchToProps = {
  getCities: citiesActions.getCities
}

export default connect(null, mapDispatchToProps)(App);
