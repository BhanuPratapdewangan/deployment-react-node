
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingComponent from './Component/LandingComponent/LandingComponent.js';
import SigninComponent from './Component/SigninComponent/SigninComponent.js';
import SignupComponent from './Component/SignupComponent/SignupComponent.js';
import HomeComponent from './Component/HomeComponent/HomeComponent.js';
import InvalidComponent from './Component/InvalidComponent/InvalidComponent.js';

function App() {
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <LandingComponent />
        <Routes className="">
            <Route path="signin" element={<SigninComponent/>}></Route>
            <Route path="/" element={<SigninComponent/>}></Route>
            <Route path="signup" element={<SignupComponent/>}></Route>
            <Route path='home' element={<HomeComponent/>}></Route>
            <Route path='invalid' element={<InvalidComponent/>}></Route>
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
