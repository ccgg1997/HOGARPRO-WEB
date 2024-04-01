import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import FooterSection from './components/commons/FooterSection.jsx';
import HeaderSection from './components/commons/HeaderSection.jsx';
import Homepage from "./pages/Homepage.jsx";
import DisponiblesPage from "./pages/servicios/DisponiblesPage.jsx";
import ContratadosPage from "./pages/servicios/ContratadosPage.jsx";


function App() {



    return (
        <BrowserRouter future={{ v7_startTransition: true }}>
            <HeaderSection />
            <div className='homepage-container-web'>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/servicios/disponibles' element={<DisponiblesPage />} />
                    <Route path='/servicios/contratados' element={<ContratadosPage />} />
                </Routes>
            </div>
            <FooterSection />
        </BrowserRouter>
    );
}

export default App;
