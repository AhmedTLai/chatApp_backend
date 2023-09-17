import { Link, Outlet } from "react-router-dom"
import axios from 'axios'
import { Suspense, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext"

const Register = () => {

    const navigate = useNavigate()
    const [err , setErr] = useState("")
    const [input , setInput] = useState('')

    const {currentUser} = useContext(AuthContext)

      const inpHundler = (e)=>{
        setInput(prev=>({...prev,[e.target.name] : e.target.value}))
      }

      const registerHundler = async (e)=>{
          e.preventDefault();
          
          try{
            const res = await axios.post('http://localhost:3000/api/auth/register',input)
            navigate('/login')
          }catch(err){
            setErr(err)
            setTimeout(()=>{setErr('')},3000)
          }
          
      }

      useEffect(()=>{
        if(!currentUser) navigate('/register')
        else navigate('/')
      },[currentUser])

    
  return (
    <div className="container py-3 px-3">

      {err ? <p className="text-danger">{err.response.data.message}</p> : ''}
      <form onSubmit={registerHundler}>
          <label className="form-label" htmlFor="fullname">Fullname</label>
          <br />
          <input onChange={inpHundler} className="form-control" required type="text" name="fullname" id="fullname" placeholder="place your fullname ..."/>
          <br />
          <label className="form-label" htmlFor="email">Email</label>
          <br />
          <input onChange={inpHundler} className="form-control" required type="email" name="email" id="email" placeholder="place your Email ..."/>
          <br />
          <label className="form-label" htmlFor="password">Password</label>
          <br />
          <input onChange={inpHundler} className="form-control" required type="password" name="password" id="password" placeholder="place your password ..."/>
          <br />
          <br />
          <button className="btn btn-primary">Register</button>
          <br />
          <br />
          <Link to='/login' className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Already have account ?</Link>

      </form>
      

    </div>
  )
}

export default Register