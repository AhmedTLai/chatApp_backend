import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
const ProfilePage = () => {

    const location = useLocation()
    const userData = location.state
    const [follow,setFollow] = useState('')
    const [res,setRes] = useState('')
    



    const hundleFollow = async()=>{
        // console.log(userData)
        try{
            axios.put(`http://localhost:3000/api/user/addfriend`,userData)
            .then(response => setRes(response.data))
            .catch(err => console.log(err))

            
        }catch(err){
            console.log(err)
        }
    }

 



    useEffect(()=>{ 

axios.get(`http://localhost:3000/api/user/checkFriendship/${userData?.user}/${userData.data?.user_id}`)
        .then(response => setFollow(response))
        .catch(err => console.log(err))

    
    },[userData,res])




  return (
    <div className='d-flex gap-3'>
        
        <Navbar />

        <div className='container d-flex justify-content-center gap-5 align-items-center w-100'>
<div style={{maxWidth : '350px', textAlign : 'center'}} className='flex-1'>
    <div className='d-flex justify-content-between align-items-center'>
    <h1 className='d-inline-block'>{userData?.data.fullname}</h1>
    <button className='btn btn-primary' onClick={hundleFollow}>{follow?.data == 'friends' ? 'followed' : 'follow' }</button>
    </div>
    <br />
    <img src={userData?.data.profile_pic} alt="profile_pic" className='rounded-circle w-75'/>
    
    <br />
    <br />
    
    
    </div>
<div className='flex-1'>

<h1>: <strong> Bio </strong>:</h1>
<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia, quibusdam. Dolorem, est voluptate perspiciatis mollitia quos fugit corrupti, eos inventore porro obcaecati minima amet numquam possimus officiis provident, consequuntur odit?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, cum sequi labore voluptas ut provident fuga commodi fugit dolores distinctio itaque illum et nostrum perferendis, delectus, saepe animi tempora tenetur?</p>
<br />
<h1>: <strong> Info About me  </strong>:</h1>

<h5 className='text-secondary'>City : <span>Setif</span></h5>
    <h5 className='text-secondary'>old : <span>21 old</span></h5>

</div>

        </div>
        </div>
  )
}

export default ProfilePage