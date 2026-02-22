import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "../pages/Home";

const MainRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/> } />
                

                <Route path="*" element={<div>404 Page</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;