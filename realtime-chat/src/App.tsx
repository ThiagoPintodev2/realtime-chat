import { BrowserRouter, Routes, Route } from "react-router";
import CreateUser from './components/pages/CreateUser'

import Login from './components/pages/Login';

import './App.css'

function App() {
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/create-user' element={<CreateUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
