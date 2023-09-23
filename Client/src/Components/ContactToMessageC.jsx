import { Link, Navigate, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import MessagesCont from "./MessagesCont"
import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import { AuthContext } from "../Context/AuthContext"
import { ContactConetext } from "../Context/ContactConetext"
import {io} from 'socket.io-client'
const Container = styled.div`

img{
    max-width : 100%;
    width : 70px;
    height : 70px;
}

`
const GreenDot = styled.div`
  max-width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #68d391;
  width : 15px !important;
  margin : 10px;
  div{
    background: #68d391;
    filter : blur(10px) ;
    width: 100%;
    height: 100%;
  }
`;

const RedDot = styled.div`
  max-width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #711;
  width : 15px !important;
  margin : 10px;
  div{
    background: #711;
    filter : blur(10px) ;
    width: 100%;
    height: 100%;
  }
`;

const ContactToMessageC = (val) => {

const [contacts,setContacts] = useState()
const {currentUser} = useContext(AuthContext)
const user_id = currentUser.data.user_id
const { GetC ,myContacts} = useContext(ContactConetext)
const socket = useRef()
const [isOnline,setIsOnline] = useState(false)
const navigate = useNavigate()



useEffect(()=>{
  
    GetC(user_id);
  
  
},[])





  return (
    <>
    
    {
    
    Array.isArray(myContacts) &&
    myContacts?.map((value,index)=>(
        val.val != 'Contacts'
        ?
    <div key={index} onClick={()=>{ 
      navigate(`/chat/${value.user_id}`,{state : {data : value ,user : user_id} })
    }}>
        <Container key={index} className="d-flex gap-3 my-5 border-bottom py-1">
        <img className="rounded" src={value.profile_pic} alt="Profilepic" />
        
        

        <div className="flex-grow-1">
            <h5>{value.fullname}</h5>
            <p className="">Click to chat this user ♥</p>
        </div>
        <div className="" style={{flex : 0}}>
            <div >{value.is_online == 1 ? <GreenDot><div/></GreenDot> : <RedDot><div/></RedDot>}</div>
        </div>
        
       
       
    </Container>
     </div>
     :
     <Container key={index}  className="d-flex gap-3 my-5 border-bottom py-1" role='button' tabIndex={0}  onClick={()=>{navigate(`/profile/${value.user_id}`,{state : {data : value ,user : user_id}})}}>
     <img className="rounded" src={value.profile_pic} alt="Profilepic" />
     
     <div className="position-relative">
        <h3>{value.fullname}</h3>
        <p className="position-relative bottom-0"> See profile </p>
        </div>
     
     </Container>
    ))}
    
    </>
  )
}

export default ContactToMessageC