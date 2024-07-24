import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginIcons from '../assest/assest/signin.gif'
import { FaRegEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email : "",
    password : "",
    name: "",
    confirmPassword: "",
    profilePic: ""
  })

  const navigate = useNavigate();

  const handleOnChange = (e) =>{
    const {name, value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] :  value
      }
    })
  }

  const handleUploadPic = async(e) =>{
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file)
    
    setData((preve)=>{
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }
  
  const handleOnSubmit = async(e) =>{
    e.preventDefault();
    
    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.signUp.url,{
        method: SummaryApi.signUp.method,
        headers:{
          "content-type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
      const dataApi = await dataResponse.json();
  
      if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/login")
      } 
      if(dataApi.error){
        toast.error(dataApi.message);
      }
    }else{
      toast.error("please check password and confirm password")
    }
  }
  return (
    <section id='signup' className='bg-[#F2EAD3]'>
        <div className='mx-auto container p-4 bg-[#F2EAD3]'>

          <div className='p-5 w-full bg-[#F2EAD3] border border-black max-w-md mx-auto rounded h-full'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
              <div>
                <img src={data.profilePic || loginIcons} alt='login icons'/>
              </div>
              <form>
                <label>
                  <div className='text-xs bg-opacity-80 bg-[#F2EAD3] pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                    Upload Photo
                  </div>
                  <input type='file' className='hidden' onChange={handleUploadPic}/>
                </label>
              </form>
            </div>

            <form className='pt-6 flex flex-col gap-2' onSubmit={handleOnSubmit}>
                <div className='name'>
                <label>Name: </label>
                <div className='bg-[#F2EAD3] border border-black rounded-lg p-2 '>
                  <input 
                    type='text' 
                    placeholder='Enter Your Name' 
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent placeholder-[#6F4E37]'/>
                </div>
              </div>
              <div className='grid'>
                <label>Email: </label>
                <div className='bg-[#F2EAD3] border border-black rounded-lg p-2 '>
                  <input 
                    type='email' 
                    placeholder='Enter Email' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent placeholder-[#6F4E37]'/>
                </div>
              </div>

              <div className='grid'>
                <label>Password: </label>
                <div className='bg-[#F2EAD3] border border-black rounded-lg p-2 flex'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Enter Password' 
                    value={data.password}
                    name='password'
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent placeholder-[#6F4E37]'/>
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
              </div>
              <div className='grid'>
                <label>Confirm Password: </label>
                <div className='bg-[#F2EAD3] border border-black rounded-lg p-2 flex'>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder='Confirm password' 
                    value={data.confirmPassword}
                    name='confirmPassword'
                    onChange={handleOnChange}
                    required
                    className='w-full h-full outline-none bg-transparent placeholder-[#6F4E37]'/>
                  <div className='cursor-pointer text-xl' onClick={()=>setshowConfirmPassword((prevVal) => !prevVal)}>
                    <span>
                      {
                        showConfirmPassword ? (
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
                
              </div>
              <button className='bg-[#6F4E37] border-2 border-black text-white hover:bg-[#3F2305] px-6 py-2 w-full max-w-[150px] rounded-full
              hover:scale-110 transition-all mx-auto block mt-6'>
                Sign up
              </button>
            </form>
            <p className='py-5'>Already have an account? <Link to={"/login"} className='text-black hover:text-[#3F2305] hover:underline'>Login</Link></p>
          </div> 
        </div>
    </section>
  )
}

export default SignUp