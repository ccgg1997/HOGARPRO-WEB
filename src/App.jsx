import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import FooterSection from './components/commons/FooterSection.jsx';
import HeaderSection from './components/commons/HeaderSection.jsx';
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/login/Login.jsx"
import DisponiblesPage from "./pages/servicios/DisponiblesPage.jsx";
import React, { useState } from 'react';


function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter future={{ v7_startTransition: true }}>
            <HeaderSection />
            <div className='homepage-container-web'>
                <Routes>
                    <Route path='/login' element={ isLoggedIn ? <Homepage /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path='/' element={ isLoggedIn ? <Homepage /> : <Navigate to='/login' />} />
                    <Route path='/servicios/disponibles' element={<DisponiblesPage />} />
                </Routes>
            </div>
            <FooterSection />
        </BrowserRouter>
    );
}

export default App;
