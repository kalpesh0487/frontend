import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import diaplayCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({ category, heading}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const [scroll, setScroll] = useState(0)
  const scrollElement = useRef()

  const {fetchUserAddToCart} = useContext(Context)

  const handleAddToCart = async(e,id) =>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const fetchData = async() =>{
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)

    setData(categoryProduct?.data)
  }

  useEffect(()=>{
    // fetchData()  
    fetchData()
  },[])

  const scrollRight = () =>{
    scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () =>{
    scrollElement.current.scrollLeft -= 300
  }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button onClick={scrollLeft} className='text-[#FED8B1] shadow-md rounded-full p-1 left-0 absolute text-lg hidden md:block'>
                    <FaAngleLeft/>
                </button>
                <button onClick={scrollRight} className='bg-black text-[#FED8B1] shadow-md rounded-full p-1 right-0 absolute text-lg hidden md:block'>
                    <FaAngleRight/>
                </button>


      {
        loading? (
          loadingList.map((product,index)=>{
            return(
                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                    </div>
                    <div className='p-4 grid w-full gap-2'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                        <div className='flex gap-3 w-full'>
                            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                            <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                        </div>
                        <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                    </div>
                </div>
            )
        })
        ): (
          data.map((product, index)=>(  
            <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex border border-black'>
                <div className='bg-[#FED8B1] h-full p-4 min-w-[120px] md:min-w-[145px]'>
                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all '/> 
                </div>
  
                <div className='p-4 grid bg-[#ECB176] border border-black'>
                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                  
                  <p className='capitalize text-[#6F4E37]'>{product?.category}</p>
                  
                  <div className='flex gap-3'>
                    <p className='text-black font-medium'>{diaplayCurrency(product?.sellingPrice)}</p>
                    <p className='text-[#3F2305] line-through'>{diaplayCurrency(product?.price)}</p>
                  </div>
  
                  <button className='text-sm border border-black bg-[#6F4E37] hover:bg-[#3F2305] text-white px-3 py-0.5 rounded-full' 
                    onClick={(e)=>handleAddToCart(e,product?._id)}
                  >Add to Cart</button>
                
                </div>
  
              </Link>
          ))
        )
        
      }
      </div>
      
    </div>
  )
}

export default HorizontalCardProduct