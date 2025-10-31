import Navbar from '@/components/Navbar'
import AboutUs from '@/pages/student/AboutUs'
import ClassCategories from '@/pages/student/ClassCategories'
import FAQ from '@/pages/student/FAQ'
import Footer from '@/pages/student/Footer'
import OnlineBootcamp from '@/pages/student/OnlineBootcamp'
import Popular from '@/pages/student/Popular'
import SupportPage from '@/pages/student/SupportPage'
import Teachers from '@/pages/student/Teachers'
import TestimonialPage from '@/pages/student/Testimonial'
import TestimonialsSwiper from '@/pages/TestimonialsSwiper'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-16' style={{marginBottom:"50px"}}>
            <Outlet/>
            
        </div>
        {/* <ClassCategories/> */}
        
        
        {/* <div style={{marginTop:"50px"}}> <OnlineBootcamp/></div>
       <div style={{marginTop:"150px"}}> <AboutUs/></div>
       <Teachers/>
       <div style={{marginTop:"150px"}}><TestimonialPage /></div>
       

        
        <div style={{marginTop:"100px" ,marginBottom:"100px"}}> <FAQ/></div> */}
       
    <Footer/>
        
    </div>
  )
}

export default MainLayout