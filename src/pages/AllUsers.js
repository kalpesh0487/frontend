import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md"
import ChangeUserRoll from '../components/ChangeUserRoll'
const AllUsers = () => {
    const [allUser, setAllusers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllusers = async()=>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method: SummaryApi.allUser.method,
            credentials: 'include'
        }) 
        const dataResponse =await fetchData.json();
        if(dataResponse.success){
            setAllusers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }
    }
    useEffect(()=>{
        fetchAllusers()
    },[])
  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTabel'>
            <thead>
                <tr className='bg-black text-white'>
                <th>Sr.</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUser.map((e,index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{e?.name}</td>
                                <td>{e?.email}</td>
                                <td>{e?.role}</td>
                                <td>{moment(e?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='p-2 rounded-full bg-green-50 hover:bg-green-300 hover:text-white cursor-pointer' 
                                        onClick={()=>{
                                            setUpdateUserDetails(e)
                                            setOpenUpdateRole(true)
                                        }}
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRoll 
                    onClose={()=> setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllusers}
                />
            )
        }
        
    </div>
  )
}

export default AllUsers