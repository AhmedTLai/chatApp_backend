import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'

const Login = () => {
  const {currentUser,err,login} = useContext(AuthContext)
  const [inp,setInp] = useState()
  const navigate = useNavigate()
  
  const inpHundler =(e)=>{
    setInp(prev=>({...prev,[e.target.name] : e.target.value}))
  }

  const loginHunler = async (e)=>{
    e.preventDefault();
    try{
      login(inp);
      
      navigate('/')
     
    }catch(err){
      console.log(err)
    }
  }

  // useEffect(()=>{
  //   if(!currentUser) navigate('/register') || navigate('/login') 
  //   else navigate('/')
  // },[currentUser])


  return (
    <div className="container py-3 px-3" style={{minHeight : '100vh'}}>

      {err ? <p className='text-danger'>{err}</p> : ''}
      <form onSubmit={loginHunler}>
          <label className="form-label" htmlFor="email">Email</label>
          <br />
          <input onChange={inpHundler} className="form-control" type="email" name="email" id="email" placeholder="place your Email ..."/>
          <br />
          <label className="form-label" htmlFor="password">Password</label>
          <br />
          <input onChange={inpHundler} className="form-control" type="password" name="password" id="password" placeholder="place your password ..."/>
          <br />
          <br />
          <button className="btn btn-primary">Login</button>
          <br />
          <br />
          <Link to='/register' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">You dont have account ?</Link>

      </form>

      <Suspense fallback={<h1>Loading ...</h1>}>
        <Outlet />
    </Suspense>
    </div>
  )
}

export default Login