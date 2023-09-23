import React, { useContext, useEffect } from "react";
import { styled } from "styled-components";
import ContactToMessageC from "../Components/ContactToMessageC";
import MessagesCont from "../Components/MessagesCont";
import io from "socket.io-client";
import Contacts from "../Components/Contacts";
import { Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'
import { ContactConetext } from "../Context/ContactConetext";
import { DarkModeContext } from "../Context/DarkModeContext";


const Container = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  div {
    width: 100%;
  }

  input {
    max-width: 100%;
    outline: none;
  }

  a{
    text-decoration : none;
  }
`;

const ContactToMessage = styled.div`
  box-shadow: 3px 0px 10px #9999993d;
  min-height: 100vh;
  padding: 5px;
  flex: 1;
`;



const Chats = (user) => {
  // const socket = io.connect("http://localhost:3000");
  const { id } = useParams();
  const {currentUser} = useContext(AuthContext)
  const location = useLocation()
  const userData = location.state

  const {myContacts} = useContext(ContactConetext)
 
 
  const {Darkmode, theme} = useContext(DarkModeContext)

  const navigate = useNavigate()
  const Logout = async () => {
    try {
      // Send a GET request to the logout endpoint with credentials.
      const response = await axios.get(`http://127.0.0.1:3000/api/auth/logout/${user_id}`, {
        withCredentials: true,
      });
  
      // Check if the logout was successful (e.g., HTTP status code 200).
      if (response.status === 200) {
        // Clear the user's token from local storage.
        localStorage.removeItem('user_token');
        navigate('/login')
        // Redirect to a login page or perform other actions as needed.
       window.location.reload() // Reload the current page as an example.
      } else {
        // Handle other response status codes if necessary.
        console.error('Logout failed with status code:', response.status);
      }
    } catch (error) {
      // Handle network errors, exceptions, or other issues.
      console.error('An error occurred during logout:', error);
    }
  };

  useEffect(()=>{
if(!currentUser) navigate('/login');
  },[currentUser])

  const user_id = currentUser.data.user_id
  const arr = []
  
  // useEffect(() => {
  
  //   axios.get(`http://localhost:3000/api/messenger/getmessages/${user_id}/${room_id}`)
  //     .then((res) => {
  //       // console.log(res)
  //       // console.log(res); // Log messageData here after it's set
  //       // console.log(res.data)
  //     })
  //     .catch((err) => console.log(err));
  // }, [])

  return (
    <div className="d-flex gap-3">
      <Navbar user={user} />

      <Container className="px-1">
        <ContactToMessage>
        <div className="d-flex justify-content-between my-1 " >
          <div className="dropdown">
        <h1 className="d-flex gap-3 fw-bold " role="button" tabIndex="0" data-bs-toggle="dropdown" aria-expanded="false">
          Messages <span><img src="/angle-down.png" alt="angle" />
          <ul className='dropdown-menu w-100 py-1'>
          <li onClick={Darkmode} className="dropdown-item py-2 d-flex align-items-center gap-3"><i className="fa-solid fa-moon text-dark fs-3 border rounded-circle w-100 px-1" style={{maxWidth : '30px'}}></i>DarkMode</li>
          <hr className="my-1"/>
          <li onClick={Logout} className="dropdown-item py-2 d-flex align-items-center gap-3 "><i className="fa-solid fa-right-from-bracket rounded-circle text-dark fs-3 border  w-100 h-100 px-1" style={{maxWidth : '30px' ,maxHeight : '40px'}}></i> logout</li>
          </ul>
        </span>
        </h1>
        
        </div>
        <Link to='/search'><div role="button" tabIndex="0" style={{width : '50px', height : '50px' , background : '#615EF0'}} className='d-flex justify-content-center align-items-center rounded-circle text-light fs-3 '>
          +
        </div></Link>
        </div>
        <div className="bg-body-secondary py-3 px-2 my-3 w-100 rounded d-flex justify-content-between align-items-center">
          <i className="fa-solid fa-magnifying-glass text-black-50 mx-3" ></i>
      <input type="text" id="search" name="search" className="w-100 border-0 bg-body-secondary text-black-50"/>
      </div>
          <div className="my-5">
            <ContactToMessageC id={id}/> {/* Pass Cards array as users prop */}
          </div>
        </ContactToMessage>

        <MessagesCont userData={userData}/>

        <Contacts  />
      </Container>
    </div>
  );
};

export default Chats;


