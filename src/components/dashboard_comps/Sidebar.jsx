import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  MdOutlineSpaceDashboard,
  MdOutlineLogout,
} from "react-icons/md";
import Cookies from 'universal-cookie';
import { useNavigate  } from "react-router-dom";
import AppContext from "../dashboard_comps/Context"

function SideNavbar() {

  const myContext = useContext(AppContext);
  const updateContext = myContext.usersDetails;

  const navigate = useNavigate();
  const cookies = new Cookies();

  const onRemove = () => {
    updateContext.setPin(null)
    updateContext.setDOB(null)
    updateContext.setStatus(null)
    updateContext.setCheckPin(null)
    updateContext.setPin(null)
    updateContext.setStudent_name(null)
    updateContext.setPercentage(null)
    updateContext.setFace_Img(null)
    
    cookies.remove('pin_number');
    cookies.remove('dob');
    cookies.remove('isLogged');
    navigate('/login');

  }

  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-[#00df9a] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            <Link to="/">
            <h1 className="text-2xl text-center cursor-pointer font-bold text-[#00df9a] border-b border-gray-100 pb-4 w-full">
              FRS Tracker.
            </h1>
            </Link>
            <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#00df9a] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Dashboard
                </h3>
              </div>

            </div>
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-red-600 p-2 rounded-md group cursor-pointer hover:shadow-lg mt-auto">
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                {/* <Link to="/login"> */}
                <button className='text-base text-gray-800 group-hover:text-white font-semibold' type='button' onClick={onRemove} >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}

export default SideNavbar;