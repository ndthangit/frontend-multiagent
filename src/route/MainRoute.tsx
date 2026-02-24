import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { ServicesProvider } from "../contexts/ServicesContext";

const MainRouter = () => {

    return (
        <BrowserRouter>
            <ServicesProvider>
                <Routes>
                    <Route path="/" element={<HomePage/> } />
                    <Route path="/dashboard" element={<Dashboard />} />


                    <Route path="*" element={<div>404 Page</div>} />
                </Routes>
            </ServicesProvider>
            
        </BrowserRouter>
    );
};

export default MainRouter;