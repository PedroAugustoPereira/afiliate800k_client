import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Perfil from './components/Home/Menus/Perfil';
import Admin from './pages/Admin';
import Afiliate from './pages/Afiliate';
import Home from './pages/Home';
import Login from './pages/Login';
import Sales from './pages/Sales';
import Welcome from './pages/Welcome';

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/login" element={<Login />}></Route>
               <Route path="/admin" element={<Admin />}></Route>
               <Route path="/" element={<Home />}></Route>
               <Route path="/bem-vindo" element={<Welcome />}></Route>
               <Route path="/perfil" element={<Perfil />}></Route>
               <Route path="/afiliate" element={<Afiliate />}></Route>
               <Route path="/sales" element={<Sales />}></Route>
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
