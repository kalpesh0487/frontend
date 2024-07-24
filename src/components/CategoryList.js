import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/index'

import '../App.css';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categorProduct, setCategorProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        // const response = await fetch(SummaryApi.categoryProduct.url)
        // const dataResponse = await response.json()
        // setLoading(false)
        // setCategorProduct(dataResponse.data)

        try {
            const response = await fetch(SummaryApi.categoryProduct.url);
            const dataResponse = await response.json();
            setCategorProduct(dataResponse.data || []);
        } catch (error) {
            console.error('Error fetching category products:', error);
            setCategorProduct([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchCategoryProduct()
    }, [])
  return (
    <div className='container mx-auto p-4'>
        {/**scroll bar line is not  working */}
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {  
            loading ? (
                    categoryLoading.map((el, index)=>{  
                        return(
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-full animate-pulse     overflow-hidden bg-slate-200'
                                key={"categoryLoading"+index}
                            ></div>
                        )
                    })  
            ):
            (
                categorProduct.slice(0,10).map((product,index)=>{
                    return(
                        <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 flex justify-center items-center bg-[#FED8B1] border border-black'>
                                <img src={product?.productImage[0]} alt={product?.category}
                                    className='z-10 h-full object-scale-down hover:scale-125 transition-all'
                                />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </Link>
                    )
                })
            )
        }
        </div>
    </div>
  )
}

export default CategoryList