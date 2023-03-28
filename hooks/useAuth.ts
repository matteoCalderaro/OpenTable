import axios from 'axios'
import { getCookie } from 'cookies-next';
import { useContext } from 'react';
import { AuthenticationContext } from '../app/context/AuthContext';

const useAuth = () => {
  const {setAuthState,loading,error,data} = useContext(AuthenticationContext)

  const signin = async ({email,password}:{email:string,password:string},handleClose:()=>void) => {

    setAuthState({loading:true,error:null,data:null})

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin',{email,password})
      setAuthState({loading:false,error:null,data:response.data})
      handleClose()
    } catch (error:any) {
      setAuthState({loading:false, error: error.response.data.errorMessage, data:null})
    }
  }
  
  const signup = async ({
    email,
    password,
    firstName,
    lastName,
    city,
    phone
  }:{
    email:string,
    password:string,
    firstName: string,
    lastName: string,
    city: string,
    phone: string
  },
  handleClose:()=>void
  ) => {

    setAuthState({loading:true,error:null,data:null})

    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup',{
      email,password,firstName,lastName,city,phone})
      setAuthState({loading:false,error:null,data:response.data})
      handleClose()
    } catch (error:any) {
      setAuthState({loading:false, error: error.response.data.errorMessage, data:null})
    }
  }

  return {
    signin,
    signup
  }
}
export default useAuth