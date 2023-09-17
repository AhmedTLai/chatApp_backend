import { Link, Navigate, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import MessagesCont from "./MessagesCont"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../Context/AuthContext"
import { ContactConetext } from "../Context/ContactConetext"

const Container = styled.div`

img{
    max-width : 100%;
    width : 70px;
    height : 70px;
}

`


const ContactToMessageC = (val) => {

const [contacts,setContacts] = useState()
const {currentUser} = useContext(AuthContext)
const user_id = currentUser.data.user_id
const { GetC ,myContacts} = useContext(ContactConetext)
const navigate = useNavigate()

useEffect(()=>{

GetC(user_id)
// console.log(myContacts)

},[])



  return (
    <>
    
    {
    
    Array.isArray(myContacts) &&
    myContacts?.map((value,index)=>(
        val.val != 'Contacts'
        ?
    <div key={index} onClick={()=>{ navigate(`/chat/${value.user_id}`,{state : {data : value ,user : user_id} })}}>
        <Container key={index} className="d-flex gap-3 my-5 border-bottom py-1">
        <img className="rounded" src={value.profile_pic} alt="Profilepic" />
        
        

        <div className="flex-grow-1">
            <h5>{value.fullname}</h5>
            <p className="text-body-secondary">Click to chat this user ♥</p>
        </div>
        <div className="" style={{flex : 0}}>
            <h5 >{value.time}m</h5>
            {value.time < 3 ? <i className="fa-regular fa-bell text-warning w-100 h-100"></i> : ''}
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