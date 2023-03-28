'use client'

import React, {useState,createContext,useEffect} from "react"
import useAuth from './../../hooks/useAuth';
import axios from 'axios'
import { getCookie } from 'cookies-next';

interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  city: string,
  phone: string
}

interface State {
  loading: boolean,
  data: User | null,
  error : string | null
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
  loading:false,
  data:null,
  error:null,
  setAuthState:()=>{}
})


const AuthContext = ({children}:{children:React.ReactNode}) => {
  
  const [authState,setAuthState] = useState<State>({
    loading:true,
    data:null,
    error:null,
  })


  useEffect(()=>{
    const fetchUser = async ()=>{
      setAuthState({loading:true,error:null,data:null})
  
      try {
        const jwt = getCookie('jwt')
        if(!jwt){
          return setAuthState({loading:false,error:null,data:null})
        }
        const response = await axios.get('http://localhost:3000/api/auth/me',{
          headers:{
            Authorization: `Bearer ${jwt}`
          }
        })
        
        axios.defaults.headers.common['Authorization']= `Bearer ${jwt}`
        setAuthState({loading:false,error:null,data:response.data})
  
      } catch (error:any) {
        setAuthState({loading:false,error:error.response.data.errorMessage,data:null})
      }
    }
    fetchUser()
  },[])

  return (
    <AuthenticationContext.Provider value={{...authState,setAuthState}}>
      {children}
    </AuthenticationContext.Provider>
  )
}
export default AuthContext