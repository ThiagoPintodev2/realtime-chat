import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import CreateUser from './components/pages/CreateUser'

import authContext from "./context/authContext";

import Login from './components/pages/Login';

import './App.css'

function App() {
  const [isAuthentication, setIsAuthentication] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <authContext.Provider value={{isAuthentication, setIsAuthentication}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/create-user' element={<CreateUser />} />
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    </div>
  )
}

export default App;
