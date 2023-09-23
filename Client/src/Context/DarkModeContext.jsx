import { createContext, useEffect, useState } from "react"


export const DarkModeContext = createContext()

export const DarkModeContextProvider = ({children}) => {

    const [theme , setTheme] = useState(
        JSON.parse(localStorage.getItem('theme')) || false
    )

        const Darkmode = ()=>{
            setTheme(!theme)
        }

    useEffect(()=>{
        localStorage.setItem('theme',JSON.stringify(theme))
    },[theme])

  return (
    <DarkModeContext.Provider value={{theme,Darkmode}}>
    {children}
    </DarkModeContext.Provider>
  )
}

