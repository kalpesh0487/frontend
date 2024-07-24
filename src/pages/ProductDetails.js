import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import {FaStar, FaStarHalf} from "react-icons/fa"
import diaplayCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'


const ProductDetails = () => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })

  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinates, setZoomImageCoordinates] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  const {fetchUserAddToCart} = useContext(Context)

  const navigate = useNavigate()

  const fetchProductDetails = async()=>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url,{
      method : SummaryApi.productDetails.method,
      headers: {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }

  useEffect(()=>{
    fetchProductDetails()
  },[params])


  const handleMouseEnterProduct = (imgURL)=>{
    setActiveImage(imgURL)
  }

  const handleZoomImage = useCallback((e)=>{
    setZoomImage(true)
    const {left, top, width, height} = e.target.getBoundingClientRect()
    console.log("co-ordinate",left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinates({
      x,
      y 
    })
  },[zoomImageCoordinates])

  const handleLeaveImageZoom = () =>{
    setZoomImage(false)
  }

  const handleAddToCart =async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4 bg-[#F2EAD3] border border-black'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/**product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 '>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-[#F2EAD3] border-2 border-black relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply border border-black' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
            {/**product zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-[#F2EAD3] border-4 border-[#3F2305] p-1 -right-[510px] top-0'>
                <div
                  className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125'
                  style={{
                    backgroundImage : `url(${activeImage})`,
                    backgroundRepeat : "no-repeat",
                    backgroundPosition: `${zoomImageCoordinates.x * 100}% ${zoomImageCoordinates.y * 100}% `
                  }}
                >
  
                </div>
              </div>
              )
            }
            
          </div>

          <div className='h-full '>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el,index)=>{
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                          
                        </div>
                      )
                    })
                  }
                </div>
              ):(
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data.productImage?.map((imgURL , index)=>{
                      return (
                        <div className='h-20 w-20 bg-[#F2EAD3] border border-black rounded p-1' key={imgURL}>
                          <img src={imgURL} className='border border-black w-full h-full object-scale-down mix-blend-multiply cursor-pointer' 
                            onMouseEnter={()=>handleMouseEnterProduct(imgURL)} 
                            onClick={()=>handleMouseEnterProduct(imgURL)}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/**product Image */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
            <p className='bg-slate-200 animate-pulse h-6  lg:h-8 rounded-full inline-block w-full'></p>
            <h2 className='bg-slate-200 animate-pulse text-2xl lg:h-8 lg:text-4xl font-medium  w-full'></h2>
            <p className='bg-slate-200 animate-pulse w-full lg:h-8 min-w-[100px]mt-1 h-6 capitalize text-slate-400'></p>

            <div className='text-red-600 w-full lg:h-8 bg-slate-200 h-6 animate-pulse flex items-center gap-1'>
            </div>

            <div className='flex items-center lg:h-8 gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse'>
              <p className='text-red-600 lg:h-8 w-full bg-slate-200'></p>
              <p className='text-slate-400 lg:h-8 w-full line-through bg-slate-200'></p>
            </div>

            <div className='flex w-full items-center gap-3 my-2'>
              <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
              <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
            </div>

            <div  className='w-full'>
              <p className='text-slate-600 lg:h-8 font-medium my-1 h-6 bg-slate-200 rounded animate-pulse'></p>
              <p className='h-10 bg-slate-200 lg:h-8 rounded animate-pulse'></p>
            </div>
        </div>
          ):(
            <div className='flex flex-col gap-1'>
            <p className='bg-[#ECB176] border border-black text-black p-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
            <p className='capitalize text-black'>{data?.category}</p>

            <div className='text-[#3F2305] flex items-center gap-1'>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStarHalf/>
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-black'>{diaplayCurrency(data?.sellingPrice)}</p>
              <p className='text-[#3F2305] line-through'>{diaplayCurrency(data?.price)}</p>
            </div>

            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-black rounded px-3 py-1 min-w-[120px] text-black font-medium hover:text-white hover:bg-[#6F4E37]' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>
              <button className='border-2 border-black bg-[#6F4E37] hover:bg-[#3F2305] rounded px-3 py-1 min-w-[120px] font-medium text-black hover:text-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
            </div>

            <div>
              <p className='text-black font-medium my-1'>Description :</p>
              <p className='w-200 h-28 border border-black shadow-sm shadow-gray-500 p-3 overflow-y-scroll scrollbar-none'>{data?.description}</p>
            </div>
        </div>
          )
        }
      </div>

        {
          data.category && (
            <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product :"}/>
          )
        }

    </div> 
  )
}

export default ProductDetails