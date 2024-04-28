import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateUserInformation() {
  
  const {currentUserData} = useSelector(state => state.user)
  
  return currentUserData? <Outlet /> :  <Navigate to='/sing-in'/>

}
