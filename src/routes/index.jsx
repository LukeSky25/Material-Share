import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Page404 } from '../pages/Page404';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { User } from '../pages/User';


export const Rotas = () => {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/user' element={<User />}></Route>
        <Route path='*' element={<Page404 />}></Route>
      </Routes>
    </BrowserRouter>

  );

};
