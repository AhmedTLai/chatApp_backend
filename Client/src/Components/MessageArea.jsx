import { useEffect, useRef } from 'react'
import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../Context/AuthContext';
import { format } from 'timeago.js';



const MessageCont = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 170px);
  scrollbar-width: none;
  height : 100%;
  &::-webkit-scrollbar {
    width: 0.4em;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
  @media (max-width : 1200px){
    max-height : 100%;
    height : 100%;
  }
`;

const MyMessage = styled.div`
  text-align: left;
  padding: 15px;
  background: #615ef0;
  color: #fff;
  white-space: wrap;
  word-break: break-word;
  width: auto!important;
  display: inline-block;
`;

const Dropdown = styled.div`
  position: relative;
  max-width : 50%;
  width: auto!important;
  .dropdown-toggle::after{
    display: none;
  }

  .dropdown-menu {
    display : block;
      height : 0px;
      padding : 0px;
      border : none;
      overflow : hidden;
      transition : 0.3s;
      top : 80%;
  }

  &:hover {
    .dropdown-menu{
      height : 35px;
      border : 1px solid #9999;
      overflow : hidden;
    }
  }
`



const MessageArea = ({userdata,messageData}) => {
    
   
    // const userToMessage = data?.user
    const {currentUser} = useContext(AuthContext)
    const user_id = currentUser.data.user_id
    const messages = messageData
    const messageRef = useRef()
    // const {myContacts} = useContext(ContactConetext)

    useEffect(()=>{
      messageRef.current?.scrollIntoView({behavior : 'smooth'})
    },[messages])


return (
  <MessageCont className="h-100" >
      {
      Array.isArray(messages) && 
      messages?.map((value, index) => (
        <>
        
        {value?.sender_id == user_id ? 
        
      <div key={index} className=''>
        <div className="d-flex gap-3 align-items-center h-100">
          <img
            src={currentUser.data.profile_pic}
            alt="profilepic"
            className="rounded-circle overflow-hidden"
            style={{ width: "30px", height: "30px"}}
          />
          <Dropdown className='dropdown'>
          <MyMessage className="rounded-pill my-3 dropdown-toggle" role='button' ref={messageRef}>{value?.last_message}</MyMessage>
            <ul className="dropdown-menu">
                <p className="dropdown-item">{format(value?.crated_at)}</p>
            </ul>
          </Dropdown>
        </div>
      </div>
      :

    <div key={index}>
        <div className="d-flex gap-3 align-items-center justify-content-end " >
          <Dropdown className='dropdown d-inline-flex justify-content-end '>
          <MyMessage className="rounded-pill my-4 dropdown-toggle  " ref={messageRef} style={{background : '#bfbee0',color : '#000'}}>{value?.last_message}</MyMessage>
            <ul className="dropdown-menu">
                <p className="dropdown-item">{format(value?.crated_at)}</p>
            </ul>
          </Dropdown>
          <img
            src={userdata?.profile_pic}
            alt="profilepic"
            className="rounded-circle overflow-hidden"
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      </div>

      }
        
      </>
      ))} 
      
    </MessageCont>
)
}


export default MessageArea