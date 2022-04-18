import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header'
import Home from './pages/Home';
import Dashboard from './pages/Dashbord';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;