import { styled } from "styled-components";
import ContactToMessageC from "./ContactToMessageC";

const ContactsC = styled.div`
flex : 1;
`;



const Contacts = () => {
  return (
    <ContactsC className="py-3 px-1">

        <div className="d-flex align-items-center text-align-left w-100 border-bottom" style={{minHeight : '50px'}}>
            <h3><strong>Directory</strong></h3>
        </div>

        <ContactToMessageC val='Contacts'/>

      </ContactsC>
  )
}

export default Contacts