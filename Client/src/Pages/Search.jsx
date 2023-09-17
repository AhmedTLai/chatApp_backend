import React, { useContext, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import UsersCards from '../Components/usersCards'
import { AuthContext } from '../Context/AuthContext'

const Search = () => {

  const [inp ,setInp] = useState('')
  const [data , setData] = useState()
  const [err , serErr] = useState()
  const {currentUser} = useContext(AuthContext)


  const user_id = currentUser.data.user_id
const FindFriend = async (e)=>{
  e.preventDefault();
  try{
    
   const res = await axios.post('http://localhost:3000/api/user/friendf',{inp,user_id})   
   localStorage.setItem('friends',JSON.stringify(res.data.userInfo))
  setData(res.data)
  
  }
  catch(err){
    console.log(err)
    setData('')
    serErr(err)
  }
}

  return (
    <div className='d-flex gap-1'>
        <Navbar />
        <div className='w-100'>
        <form onSubmit={FindFriend} className='container'>
          <label htmlFor="Search" className='form-label'>Search for your friends here</label>
          <input className='form-control' type="text" name='search' id='Search' placeholder='enter your friends name ...' onChange={(e)=>{setInp(e.target.value)}}/>
          <br />
          <button className='btn bg text-white'>Search</button>
        </form>
        <hr />
        <UsersCards data={inp != '' && data ? data : 'No data'}/>
        </div>
        </div>
  )
}

export default Search