import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpods"}/>
      <HorizontalCardProduct category={"camera"} heading={"Top Camera"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Top Mobile Phones"}/>
      <VerticalCardProduct category={"mouse"} heading={"Top mouse"}/>
      <VerticalCardProduct category={"Refrigerator"} heading={"Top Refrigerator"}/>
      <VerticalCardProduct category={"printers"} heading={"Top printers"}/>
      <VerticalCardProduct category={"speakers"} heading={"Top speakers"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Top trimmers"}/>
      <VerticalCardProduct category={"earphones"} heading={"Top earphones"}/>
      <VerticalCardProduct category={"processor"} heading={"Top processor"}/>
      <VerticalCardProduct category={"television"} heading={"Top television"}/>
      <VerticalCardProduct category={"watches"} heading={"Top watches"}/>
    </div>
  )
}

export default Home