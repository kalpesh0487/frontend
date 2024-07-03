import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/assest/signin.gif'
import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
  const [showPassword , setShowPassword] = useState(false);
  const [data, setData] = useState({
    email : "",
    password : ""
  })
  const navigate = useNavigate()
  const {fetchUserDetails} = useContext(Context)

  const handleOnChange = (e) =>{
    const {name, value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] :  value
      }
    })
  }
  
  const handleOnSubmit = async(e) =>{
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url,{
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type" : "application/json",
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }

  }
  
  return (
    <section id='login'>
        <div className='mx-auto container p-4'>

          <div className='p-5 w-full bg-[#F3F6F7] max-w-md mx-auto rounded h-full'>
            <div className='w-20 h-20 mx-auto'>
              <img src={loginIcons} alt='login icons'/>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleOnSubmit}>
              <div className='grid'>
                <label>Email: </label>
                <div className='bg-slate-100 p-2 '>
                  <input 
                    type='email' 
                    placeholder='enter email' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent'/>
                </div>
              </div>
              <div className='grid'>
                <label>Password: </label>
                <div className='bg-slate-100 p-2 flex'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='enter password' 
                    value={data.password}
                    name='password'
                    onChange={handleOnChange}
                    className='w-full h-full outline-none bg-transparent'/>
                  <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prevVal) => !prevVal)}>
                    <span>
                      {
                        showPassword ? (
                          <FaEyeSlash/>
                        )
                        :
                        (
                          <FaRegEye/>
                        )
                      }
                    </span>
                  </div>
                </div>
                <Link to={'/forgot-password'} className='mt-4 block w-fit ml-auto hover:underline hover:text-red-600'>
                      Forgot password ?
                </Link>
              </div>
              <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full
              hover:scale-110 transition-all mx-auto block mt-6'>
                Login
              </button>
            </form>
            <p className='py-5'>Don't have account? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
          </div> 
        </div>
    </section>
  )
}

export default Login