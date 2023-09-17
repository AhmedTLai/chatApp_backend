import { Routes, Route ,useNavigate, Outlet } from 'react-router-dom';
// import Register from './Pages/Register';
// import Login from './Pages/Login';
import { Suspense, lazy, useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';
import "./App.css"
// import Chats from './Pages/Chats';
// import Search from './Pages/Search';
// import MessagesCont from './Components/MessagesCont'
// import ErrElmnt from './Pages/ErrElmnt'

const Login = lazy(()=> import('./Pages/Login'))
const Chats = lazy(()=> import('./Pages/Chats'))
const Search = lazy(()=> import('./Pages/Search'))
const MessagesCont = lazy(()=> import('./Components/MessagesCont'))
const ErrElmnt = lazy(()=> import('./Pages/ErrElmnt'))
const Register = lazy(()=> import('./Pages/Register'))
const ProfilePage = lazy(()=> import('./Pages/profilePage'))


function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

 

  return (
    <>
    
    <Suspense fallback={<h1>Loading ...</h1>}>
    <Routes>
      <Route path="/" element={currentUser ? <Chats /> : <Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {currentUser ? (
        <>
        
          <Route path="/chat" element={<Chats />}>
            <Route path=":id" element={<MessagesCont />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path='/profile/:id' element={<ProfilePage />}/>
          <Route path="*" element={<ErrElmnt list="isAuth" />} />
        </>
      ) : (
        <Route path="*" element={<ErrElmnt list="isNotAuth" />} />
      )}
    </Routes>
    
        <Outlet />
    </Suspense>
    </>
  );
}

export default App;
