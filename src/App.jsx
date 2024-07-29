import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'

import LogSign from './Pages/SignUp'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import { AuthProvider } from './AuthContext'
import Bloglist from './Pages/Bloglist'
import Usersblogs from './Pages/Usersblogs'
import BlogEdit from './Pages/BlogEdit'
function App() {
  return (
<AuthProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
       
        <Route path='/Signup' element={<LogSign/>}></Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Bloglist/>} />
        <Route path='/userblogs' element={<Usersblogs/>}></Route>
        <Route path='/edit/:id' element={<BlogEdit/>}/>
    </Routes>
    </BrowserRouter>
</AuthProvider>
   
        
   
   
  )
}

export default App
