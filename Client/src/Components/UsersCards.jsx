import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const AddFriend = (data) => {
  const navigate = useNavigate()

  const { currentUser } = useContext(AuthContext);
  const user_id = currentUser.data.user_id;
  data = data.data ? data.data : 'no data'
  const [dataState, setdataState] = useState([]);
  const [friendStatus , setFriendStatus] = useState('')
const [friendId , setFriendId] = useState(null)



  const handleAddFriend = (user,index)=>{
    
    // console.log(user_id+' '+user.user_id)
    setdataState(user)
    // console.log(friendStatus)
    

  }

  let arr = []
  let folowers = []
  useEffect(()=>{
    if(Array.isArray(data)){
      data?.map((value,index)=>(
      // setFriendId(value.user_id)
      arr.push(value.user_id),
      // console.log({friend : value.user_id})
      console.log(arr.forEach((e)=>{
        
        console.log(e == 9 ? folowers.push({id : e}) : 'false : ' + e  )
        

      return 
      }))
    ))
    
    try{
      if(friendId != null){
        axios.get(`http://127.0.0.1:3000/api/user/checkFriendship/${user_id}/${friendId}`)
        .then(response => {
          setFriendStatus([...friendStatus,{friendStatus :response.data}])})
        .catch(err => console.log(err))
      }
    }catch(err){
      console.log(err)
    }
    }
    
  },[dataState])




  return (
    <>
      {data !== 'No data' ? (
        <>
        
        {
        Array.isArray(data) &&
        data?.map((value, index) => (
        <div key={index}  onClick={()=>{navigate(`/profile/${value.user_id}`,{state : {data : value ,user : user_id}})}}>
          <div className='d-flex gap-2 my-3 border-bottom py-2 px-1 align-items-center w-100'>
            <img src={value?.profile_pic} alt='profilepic' className='mx-2 w-100 rounded-circle overflow-hidden flex-1' style={{ maxWidth: '70px' }} />
            <div className='flex-3 d-flex align-items-center text-left'>
              <h5 className=''>{value?.fullname}</h5>
            </div>
            <div className='flex-1 d-flex'>
              {/* <button
                className='btn btn-primary w-75'
                onClick={() => handleAddFriend(value, index)}
               // Disable the button if already added
              >
                {friendStatus[index]?.friendStatus == 'friends' && dataState.user_id == folowers.id  ? 'friends' : 'Add Friend'}
              </button> */}
            </div>
          </div>
          </div>
        ))}
        
        </>
      ) : (
        <p className='text-center fs-1'>Search for some friends in the search bar </p>
      )}
    </>
  );
};

export default AddFriend;
