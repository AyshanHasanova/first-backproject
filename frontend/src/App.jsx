
import './App.css'
// componentler
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// sehifeler
import Home from './pages/Home'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'


function App() {


  return (
 <>
 <BrowserRouter>
 <Navbar/>
 <Toaster/>
 <Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/login' element={<Login/>}/>
  <Route path='/forgot-password' element={<ForgetPassword/>}/>
  <Route path='/reset-password' element={<ResetPassword/>}/>
  <Route path='/register' element={<Register/>}/>

  
 </Routes>
 </BrowserRouter>
 
 </>
  )
}

export default App
