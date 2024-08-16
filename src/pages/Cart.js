import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import diaplayCurrency from '../helpers/displayCurrency'
import {MdDelete}  from "react-icons/md"
import { Link } from 'react-router-dom'

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async() =>{
       
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: "include",
            headers : {
                "content-type" : "application/json"
            }
        })
    
        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    const handleLoadinng = async()=>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoadinng()
        setLoading(false)
    },[])

    const increaseQty = async(id, qty)=>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials: "include",
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({
                _id: id,
                quantity : qty + 1
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()  
        }
    }

    const decreaseQty = async(id, qty)=>{
        if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method: SummaryApi.updateCartProduct.method,
                credentials: "include",
                headers : {
                    "content-type": "application/json"
                },
                body : JSON.stringify({
                    _id: id,
                    quantity : qty - 1
                })
            })
    
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()  
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method: SummaryApi.deleteCartProduct.method,
            credentials: "include",
            headers : {
                "content-type": "application/json"
            },
            body : JSON.stringify({
                _id: id
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()  
            context.fetchUserAddToCart()
        }
    }
    const totalQty = data.reduce((previousValue, currentValue)=>previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve, curr)=>preve + (curr.quantity * curr?.productId?.sellingPrice),0)

    return (
    <div className='container mx-auto bg-[#F2EAD3]'>
        <div className='text-center text-lg my-3 border border-black'>
            {data.length===0 && !loading &&(
                <p className='bg-[#F2EAD3] py-5'>No data</p>
            )}
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4 border border-black'>
            {/**view product */}
            <div className='w-full max-w-3xl border'>
            {
                loading ? (
                    loadingCart.map((el,index)=>{
                        return(
                            <div key={el + "Add to cart loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>

                            </div> 
                        )
                    })
                    
                ):(
                    data.map((product, index)=>{
                        return (
                            <div key={product?._id + "Add to cart loading"} className='w-full bg-white h-32 my-2 border border-black  rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32  border border-black  p-2 bg-[#FED8B1]'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full  object-scale-down'/>
                                </div>
                                <div className='px-4 py-2 relative bg-[#ECB176]'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-black rounded-full p-2 hover:bg-[#3F2305] hover:text-white cursor-pointer'
                                        onClick={()=>deleteCartProduct(product?._id)}
                                    >
                                        <MdDelete/>
                                    </div>


                                    <h2 className='text-lg lg:text-md text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>    
                                    <p className='capitalize text-[#6F4E37]'>{product?.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-black font-medium text-lg'>{diaplayCurrency(product?.productId?.sellingPrice)}</p>
                                        <p className='text-[#3F2305] line-through font-semibold text-lg'>{diaplayCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-black hover:bg-[#3F2305] hover:text-white text-black w-6 h-6 flex justify-center items-center rounded'
                                            onClick={()=>decreaseQty(product?._id, product?.quantity)}
                                        >-</button>
                                        <span>{product?.quantity}</span>
                                        <button className='border border-black hover:bg-[#3F2305] hover:text-white text-black w-6 h-6 flex justify-center items-center rounded'
                                            onClick={()=>increaseQty(product?._id, product?.quantity)}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                )
            }
            </div>
            {/** summary */}
            <div className='mt-5 lg:mt-0 w-full max-w-sm '>
            {
                    loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                            
                        </div>
                    ) : (
                        <div className='h-36 bg-[#ECB176] border border-black'>
                            <div>
                                <h2 className='text-white bg-[#6F4E37] px-4 py-1'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-black'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>    
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-black'>
                                    <p>Total Price</p>
                                    <p>{diaplayCurrency(totalPrice)}</p>    
                                </div>
                            </div>

                            <Link to="/payment"
                            className='bg-[#3F2305] p-2 text-white w-full mt-8 border-2 border-black inline-block text-center'>
                                Payment
                            </Link>
                        </div>
                    )
            }
            </div>
        </div>
    </div>
  )
}

export default Cart