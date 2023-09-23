import { Routes, Route ,useNavigate, Outlet } from 'react-router-dom';
// import Register from './Pages/Register';
// import Login from './Pages/Login';
import { Suspense, lazy, useContext, useEffect } from 'react';
import { AuthContext } from './Context/AuthContext';
import "./App.css"
import { DarkModeContext } from './Context/DarkModeContext';
import styled from 'styled-components';
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


const Loading = styled.div`
  
min-height : 100vh;
display : flex;
justify-content : center;
align-items : center;


img{
  max-width : 100px;
}

`


function App() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const {theme} = useContext(DarkModeContext)

  const Body = styled.div`
  
  background : ${theme ? '#111' : '#fff'};
  color : ${theme ? '#fff' : '#111'} !important;
  a{
    color : ${theme ? '#fff' : '#111'} !important;
  }


  `



  return (
    <Body className='body'>
    
    <Suspense fallback={<Loading><img src="/loading.gif" alt="loading..." /></Loading>}>
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
    </Body>
  );
}

export default App;
