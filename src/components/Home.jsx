import React from 'react'
import Analytics from './home_comps/Analytics'
import Footer from './home_comps/Footer'
import Hero from './home_comps/Hero'
import Navbar from './home_comps/Navbar'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Analytics />
      <Footer />
    </>
  )
}

export default Home