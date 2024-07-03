import React, { useState } from 'react'
import { MdModeEditOutline } from 'react-icons/md'
import AdminEditProduct from './AdminEditProduct'
import diaplayCurrency from '../helpers/displayCurrency'

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)
  return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                <img src={data?.productImage[0]} width={120} height={120} className='mx-auto h-full object-fill'/> 

                </div>
                <h1 className='w-fit mx-auto text-ellipsis line-clamp-2'>{data.productName}</h1> 

                <div>
                    <p className='w-fit mx-auto font-semibold '>
                        {
                            diaplayCurrency(data.sellingPrice)
                        }
                    </p>
                    <div 
                        className='w-fit ml-auto p-2 cursor-pointer bg-green-100 
                        rounded-full hover:bg-green-600 hover:text-white'
                        onClick={()=>setEditProduct(true)}
                    >   
                        <MdModeEditOutline/>
                    </div>
                </div>
            </div>

            {
                editProduct && (
                    <AdminEditProduct 
                        productData={data} 
                        onClose={()=>setEditProduct(false)}
                        fetchdata= {fetchdata}
                    />
                )
            }
            
        </div>
  )
}

export default AdminProductCard