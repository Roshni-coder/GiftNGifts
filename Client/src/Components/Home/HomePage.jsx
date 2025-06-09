import React from 'react'
import Banner from '../Home/HomePageSlider/Banner.jsx'
import NavCatSlider from '../Home/NavcatSlider/NavcatSlider.jsx'
import FreeShip from '../Home/Advertise/FreeShip.jsx'
import Adevert from '../Home/Advertise/Adevert.jsx'
import ProductSlider from '../Home/ProductSlider/Productslider.jsx'
import MiddelAds from '../Home/Advertise/MiddelAds.jsx'
import RelationSlider from './RelationshipSlider/RelationSlider.jsx'
import Chatbot from '../ChatBot/ChatBot.jsx'



function Home() {
  return (
    <>
     <Banner/> 
     <section className='py-3 bg-white sm:mt-2 sm:mb-2 mt-1 mb-1'><h5 className='text-[10px] sm:text-[15px] font-[600] text-center'>Celebrate Occasions with India's #1 Online Gift Store</h5> </section>
     <NavCatSlider/>
     <FreeShip/>
     <Adevert/>
     <MiddelAds/>
     <ProductSlider  title='Birthday Gifts That Wow' />
     <Chatbot/>
     <RelationSlider/>
    </>
  )
}

export default Home
