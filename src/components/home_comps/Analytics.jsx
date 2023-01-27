import React from 'react';
import Laptop from '../../assets/laptop.jpg';
import { Link } from 'react-router-dom';

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Laptop} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>ATTENDANCE DASHBOARD</p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Effortless Attendance Tracking</h1>
          <p>
          Whether you're in a classroom, at a conference, or in a remote work environment,
           our software makes it easy to keep track of who's present. 
           With FRS Attendance Checker, you can say goodbye to manual attendance tracking and hello to accurate, effortless attendance monitoring.
          </p>
          <Link to="/login"><button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
