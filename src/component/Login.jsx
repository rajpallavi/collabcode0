import { signInWithPopup, signInWithRedirect } from 'firebase/auth'
import React from 'react'
import { useContext } from 'react';
import UserContext from '../context/userContext'
import {auth,provider} from '../firebase/firebase'
import { useNavigate } from "react-router-dom";
import bg from "../assets/loginimage/loginbg.jpeg";
import googlelogo from "../assets/loginimage/google.jpeg";
// import applelogo from "../assets/loginimage/apple.png";
import applelogo from '../assets/loginimage/apple.svg'
function Login() {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logins = [{name:'Continue with Google',logo:googlelogo},{name:'Apple',logo:applelogo}]

  async function google(){
    let data = await signInWithPopup(auth,provider)
    // console.log(data._tokenResponse.displayName)
    // setUser(data._tokenResponse);
    setUser(data._tokenResponse.displayName)
    localStorage.setItem('user',JSON.stringify(data._tokenResponse.displayName))
    navigate('/Navbar')
  }

  function methodLogin(name){
    switch(name){
      case 'Continue with Google':
        google()
        console.log('Google')
        break

      case 'Apple':
        console.log('Apple')
        break  

    }
  }

  return (

    <div className='w-screen h-screen flex justify-center items-center relative'>
        <img className='absolute  bg-center blur-sm scale-105 top-0 left-0 w-full h-full ' src={bg} alt="" />
        
          <div className='relative  bg-[#0B1020]/ border border-blue-500/80 rounded-2xl shadow-[0_0_40px_rgba(37,99,235,0.35)] shadow-[0_0_40px_rgba(37,99,235,0.35)], flex flex-col justify-center items-center bg-[#00000084]  w-[30%] h-[65%] gap-4  '>
            <div className='text-5xl from-neutral-100 text-white'>
              <h1>LOGIN</h1> 
            </div>

            {/* <div className='border flex justify-center items-center hover:bg-slate-200 rounded-2xl font-extralight text-2xl w-[70%] h-[10%]'>
              <h1>Continue with Google</h1>
            </div>

            <div className='border flex justify-center items-center hover:bg-slate-200 rounded-2xl font-extralight text-2xl w-[70%] h-[10%] bg-'>
              <h1>Apple</h1>
            </div> */}
            {logins.map((login)=>(
              <div key={name} className={`border-black flex justify-center  items-center border-2 border-gray-300, hover:border-blue-300 rounded-2xl font-extralight text-2xl w-[70%] h-[10%] 
              ${
               login.name == 'Continue with Google' ? 'bg-white' :'bg-blue-500'
              } 
              `} onClick={()=>methodLogin(login.name)}>
                  <img className='w-8 flex gap-4 items-center'  
                  src={login.logo} alt="" />
                  {login.name}
              </div>
            ))}

            
          </div>

          <div className='absolute -z-10  shadow-gray-500  animate-pulse ease-in-out  shadow-2xl  rounded-3xl w-[30%] h-[65%] '> 
          </div>
        
      
    </div>
  )
}

export default Login


