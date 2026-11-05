import CreateUser from './components/CreateUser'

import { BrowserRouter, Routes, Route } from "react-router";

import './App.css'

function App() {
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/create-user' element={<CreateUser/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
