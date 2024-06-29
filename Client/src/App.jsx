import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SingIn from './pages/SingIn'
import SingUp from './pages/SingUp'
import Profile from './pages/Profile'
import AboutUs from './pages/AboutUs'
import CreatePropertie from './pages/CreatePropertie'
import EditPropertie from './pages/EditPropertie'
import Properties from './pages/Properties'
import PrivateAuthPages from './components/PrivateAuthPages'
import PrivateUserInformation from './components/PrivateUserInformation'
import Redirect from './components/Redirect'
import Property from './pages/Property'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<AboutUs />}/>
        <Route path='/properties' element={<Properties />}/>

        <Route element={<PrivateAuthPages />}>
          <Route path='/sing-in' element={<SingIn />}/>
          <Route path='/sing-up' element={<SingUp />}/>
        </Route>
        
        <Route element={<Redirect />}>
          <Route path='/edit-property/' element={<EditPropertie />}/>
          <Route path='/property' element={<Property />}/>

        </Route>
        
        <Route element={<PrivateUserInformation />}>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/create-property' element={<CreatePropertie />}/>
          <Route path='/edit-property/:id' element={<EditPropertie />}/>
        </Route>
        <Route path='/property/:id' element={<Property />}/>

      </Routes>

    </BrowserRouter>
  )
}
