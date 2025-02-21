import { createContext, useState } from "react";




export let counterContext = createContext()




export default function CounterContextProvider (props){
    let [count , setCount] = useState (10)
    return <counterContext.Provider value={{count,setCount}}>
         {props.children}
    </counterContext.Provider>
}