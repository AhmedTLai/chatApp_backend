import axios from "axios";
import { createContext, useState } from "react";



export const ContactConetext = createContext()

export const ContactConetextProvider = ({children})=>{

    const [myContacts,setMyContacts] = useState(null)
 

    const GetC = async (user_id) => {
     
        try {
          const response = await axios.get(
            `http://127.0.0.1:3000/api/user/contacts/${user_id}`
          );
  
          setMyContacts(response.data);
        } catch (err) {
          console.log(err);
        }
      }


   

     

     

// console.log(myContacts)

    return(
        <ContactConetext.Provider value={{myContacts,GetC}}>
        {children}
        </ContactConetext.Provider>
    )

}
