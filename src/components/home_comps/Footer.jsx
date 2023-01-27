import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>FRS Tracker.</h1>
        <p className='py-4'>Our software is designed to make attendance tracking as simple as possible, whether you're in a classroom, at a conference, or in a remote work environment.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex mt-6'>
        
				<div className="container flex flex-col md:flex-row items-center justify-end">
					<p className="mb-4 md:mb-0 md:text-xl font-bold">Built With 💖 By M<sup>2</sup></p>
				</div>
      </div>
    </div>
  );
};

export default Footer;
