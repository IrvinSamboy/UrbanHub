import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import Header from './components/Header'
import Properties from './pages/Properties'
import PrivateAuthPages from './components/PrivateAuthPages'
import PrivateUserInformation from './components/PrivateUserInformation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route element={<PrivateAuthPages />}>
          <Route path='/sing-in' element={<SingIn />}/>
          <Route path='/sing-up' element={<SingUp />}/>
        </Route>
        <Route element={<PrivateUserInformation />}>
          <Route path='/profile' element={<Profile />}/>
        </Route>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/properties' element={<Properties />}/>
      </Routes>
    </BrowserRouter>
  )
}
