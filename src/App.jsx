import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import Header from './components/Header'
import Properties from './pages/Properties'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sing-in' element={<SingIn />}/>
        <Route path='/sing-up' element={<SingUp />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/properties' element={<Properties />}/>
      </Routes>
    </BrowserRouter>
  )
}
