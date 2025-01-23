import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/dashboard'
import LoginPage from './pages/login'
import SignupForm from './pages/signup'
import Dash_donor from './pages/dash_donor'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/donor" element={<Dash_donor />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/Signup" element={<SignupForm />} />
                
                {/* Other routes */}
            </Routes>
        </Router>
      
    </>
  )
}

export default App
