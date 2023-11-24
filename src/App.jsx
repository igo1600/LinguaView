import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Router>
      <div>
        <section>                              
            <Routes>                                                                        
              <Route path="/" element={<Home/>}/>
              <Route path="/home" element={<Home/>}/>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
    
  )
}

export default App
