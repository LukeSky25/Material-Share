import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { User } from './pages/User';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/user' element={<User />}></Route>
        <Route path='*' element={<Page404 />}></Route>
      </Routes>
      <ToastContainer
        className={'toast'}
        autoClose={3000}
      />
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
);
