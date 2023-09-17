import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const Nav = styled.div`
  width: 70px;
  min-height: 100vh; /* Changed to 100vh */
  padding: 15px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow : 0px 0px 5px 3px #9999993d;
   /* Added to distribute items vertically */
.dropdown-toggle::after{
      display: none;
    }

    .dropdown-menu{
      display : block;
      height : 0px;
      padding : 0px;
      border : none;
      overflow : hidden;
      transition : 0.3s;
    }

   .dropdown:hover {
    .dropdown-menu{
    height : 35px;
    border : 1px solid #9999;
    overflow : hidden;
    

  }
}

`

const ProfileDiv = styled.div`
  width: 50px;
  height: 50px;
  background: #615EF0;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: #fff;
`

const Icons = styled.div`
  .active {
    color: #615EF0;
  }
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px 0px;
    color: #111;
    text-decoration: none;
  }
`

const Settings = styled.div`
  position: fixed; /* Changed to fixed */
  bottom: 0; /* Placed at the bottom */
  left: 15px; /* Placed at the right corner */
  padding: 10px; /* Added padding for spacing */

  @media screen and (max-width : 400px){
    position : relative;
    left: 0px;
  }
`

const Navbar = (user) => {

  const {currentUser} = useContext(AuthContext)


  const username = currentUser.data.fullname
  const firstLetterUsername = username.charAt(0).toUpperCase()

  return (
    <Nav>
      <div className='dropdown'>

      <ProfileDiv className='dropdown-toggle' role='button'>{currentUser ? firstLetterUsername : '.'}</ProfileDiv>
    
      <ul className='dropdown-menu'>
      <li className='dropdown-item justify-content-center d-flex'>{username}</li>
      </ul>
      </div>
      <br />
    <br />
      <Icons>
        <NavLink to='/'><i className='fa-solid fa-home'></i></NavLink>
        <NavLink to='/chat'><i className='fa-solid fa-message'></i></NavLink>
        <NavLink to='/search'><i className="fa-solid fa-magnifying-glass"></i></NavLink>
      </Icons>
      <Settings><i className="fa-solid fa-gear"></i></Settings>
    </Nav>
  )
}

export default Navbar