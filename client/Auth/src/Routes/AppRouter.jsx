import {useState,createContext} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import RegisterPage from '../Pages/RegisterPage'
import LoginPage from '../Pages/LoginPage'
import ResetPassPage from '../Pages/ResetPassPage'
import OtpPage from '../Pages/OtpPage'
import NewPassPage from '../Pages/NewPassPage'
import NotFound from '../Components/NotFound'

export const userProfileContext = createContext();

export default function AppRouter() {

  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('profileName') || 'login';
  });

  return (
    <>
        <BrowserRouter>
          <userProfileContext.Provider value={{ profileName, setProfileName }}>
              <Routes>
                  <Route path='/' element={<HomePage/>}/>
                  <Route path='/register' element={<RegisterPage/>}/>
                  <Route path='/login' element={<LoginPage/>}/>
                  <Route path='/resetpassword' element={<ResetPassPage/>}/>
                  <Route path='/otp_reset' element={<OtpPage/>}/>
                  <Route path='/new_password' element={<NewPassPage/>}/>
                  <Route path='*' element={<NotFound/>}/>
              </Routes>
            </userProfileContext.Provider>
        </BrowserRouter>
    </>
  )
}
