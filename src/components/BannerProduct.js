import React, { useEffect, useState } from 'react'
import image1 from '../assest/assest/banner/poster1Desktop.png'
import image2 from '../assest/assest/banner/posterDesktop2.png'
import image3 from '../assest/assest/banner/pD4.png'
import image4 from '../assest/assest/banner/posterDesktop4.png'
import image5 from '../assest/assest/banner/pdD5.png'

import image1Mobile from '../assest/assest/banner/poster1Mobile.png'
import image2Mobile from '../assest/assest/banner/posterMobile2.png'
import image3Mobile from '../assest/assest/banner/posterMobile3.png'
import image4Mobile from '../assest/assest/banner/pD4M.png'
import image5Mobile from '../assest/assest/banner/pM5.png'

import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6'

const BannerProduct = () => {
    const[currentImage, setcurrentImage] = useState(4)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile,
    ]

    const nextImage =() =>{
        if(desktopImages.length-1 > currentImage){
            setcurrentImage(prev => prev + 1)
        }
    }

    const prevImage =() =>{
        if(currentImage != 0){
            setcurrentImage(prev => prev - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length-1 > currentImage){
                nextImage()
            }else{
                setcurrentImage(0)
                // prevImage()
            }
        }, 5000)
        return ()=> clearInterval(interval)
    },[currentImage])


  return (
    <div className='container mx-auto  rounded border border-black'>
        <div className='h-56 md:h-96 w-full bg-slate-200 relative '>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                <div className='flex justify-between w-full text-2xl'>
                <button className='bg-black text-[#FED8B1] shadow-md rounded-full p-1' onClick={prevImage}>
                    <FaAngleLeft/>
                </button>
                <button className='bg-black text-[#FED8B1] shadow-md rounded-full p-1' onClick={nextImage}>
                    <FaAngleRight/>
                </button>
                </div>
            </div>

            {/**desktop and tablet version*/}
           <div className='hidden md:flex h-full w-full overflow-hidden'>
           {
                desktopImages.map((imageURl, index)=>{
                    return (
                        <div 
                            className='w-full h-full min-w-full min-h-full transition-all ' 
                            key={imageURl}
                            style={{transform: `translateX(-${currentImage *  100}%)`}}
                        >
                            <img src={imageURl} className='w-full h-full object-cover'/>
                        </div>
                    )
                })
            }
           </div>

             {/**mobile version*/}
           <div className='flex h-full w-full overflow-hidden md:hidden'>
           {
                mobileImages.map((imageURl, index)=>{
                    return (
                        <div 
                            className='w-full h-full min-w-full min-h-full transition-all border border-black' 
                            key={imageURl}
                            style={{transform: `translateX(-${currentImage *  100}%)`}}
                        >
                            <img src={imageURl} className='w-full h-full'/>
                        </div>
                    )
                })
            }
           </div>
        </div>
    </div>
  )
}

export default BannerProduct