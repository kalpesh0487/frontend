import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import {useDispatch, useSelector} from 'react-redux'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import {setUserDetails} from '../store/userSlice'
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch  = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  
  const handleLogout = async() =>{
    const fetchData =  await fetch(SummaryApi.logout_user.url,{ 
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e) =>{
    const {value} = e.target
    setSearch(value)
    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-[#FDEACF] border border-black fixed z-40 w-full'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
           <Logo w={90} h={60}/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2  border-black'>
          <input type='text' placeholder='serach your product...' className='px-4 w-full outline-none bg-[#FDEACF] placeholder-[#3F2305]' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 bg-[#6F4E37] flex items-center justify-center rounded-r-full text-white '>
            <GrSearch/>
          </div>
        </div>

        <div className='flex items-center gap-7 pl-4'>
          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-2xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
            {
              user?.profilePic ?(
                <img src={user?.profilePic} className='w-10 h-10 rounded-full border-2 border-black' alt={user?.name}/>
              ): (
                <FaRegUserCircle/>
              )
            }
            </div>
              )
            }
            {
              menuDisplay && (
                <div className='absolute bg-[#6F4E37]  bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                <nav className='bg-[#6F4E37] text-white '>
                  {
                    user?.role === ROLE.ADMIN && (
                      <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block p-2 ' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                    )
                  }
                </nav>
                </div>
              )
            }
            
          </div>

          {
             
            user?._id && (
                <Link to={"cart"} className='text-2xl cursor-pointer relative text-black'>
                <span>
                    <FaShoppingCart/>
                </span>
           
                <div className='bg-[#6F4E37] text-white hover:bg-[#3F2305] w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
                </Link>
              )
          }

          <div>
            {
              user?._id ?(
                <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-[#6F4E37] text-white hover:bg-[#3F2305]'>Logout</button>
              ):(
                <Link to={"/login"} className='px-3 py-1 rounded-full bg-[#6F4E37] text-white hover:bg-[#3F2305]'>
                Login
              </Link>
              )
            }
              
          </div>



        </div>
      </div>
    </header>
  )
}

export default Header