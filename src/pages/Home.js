import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


const Home = () => {
  return (
    <div className='bg-[#F2EAD3]'>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"portrait"} heading={"Top Portrait Art"}/>
      <HorizontalCardProduct category={"landscape"} heading={"Top Landscape Art"}/>
      <VerticalCardProduct category={"digital"} heading={"Top Digital Art"}/>
      <VerticalCardProduct category={"mandala"} heading={"Top Mandala Art"}/>
      <VerticalCardProduct category={"madhubani"} heading={"Top Madhubani Art"}/>
      <VerticalCardProduct category={"statue"} heading={"Top Statue Art"}/>
      <VerticalCardProduct category={"zen"} heading={"Top Zen Art"}/>
      <VerticalCardProduct category={"comic"} heading={"Top Comic Art"}/>
      <VerticalCardProduct category={"scandinavian"} heading={"Top Scandinavian Art"}/>
      <VerticalCardProduct category={"expressionist"} heading={"Top Expressionist Art"}/>
      <VerticalCardProduct category={"minimalistic"} heading={"Top Minimalistic Art"}/>
      <VerticalCardProduct category={"brutalism"} heading={"Top Brutalism Art"}/>
    </div>
  )
}

export default Home