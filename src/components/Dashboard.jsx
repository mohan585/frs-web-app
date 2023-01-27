import React, {useState, useContext, useEffect} from 'react'
import Sidebar from './dashboard_comps/Sidebar'
import { Link } from 'react-router-dom';
import { FaUser,FaCalendar } from 'react-icons/fa'
import Cands from './dashboard_comps/Cands'
import Example from './dashboard_comps/Example'
import AppContext from './dashboard_comps/Context';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Dashboard = () => {

  const myContext = useContext(AppContext);
  const updateContext = myContext.usersDetails;
  const cookies = new Cookies();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const cookie = cookies.get('pin_number');
    const dob = cookies.get('dob');

    updateContext.setPin(cookie)
    updateContext.setDOB(dob)

    if (!cookie) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  

  useEffect(() => {

		setRequestData({
      "pin": updateContext.userPin,
        });

	  }, [updateContext.userPin]);


  const [requestData, setRequestData] = useState({
		// "pin": updateContext.userPin,
		  });

  useEffect(() => {
		const fetchData = async () => {
		  try {
			const headers = {
				'accept': 'application/json',
				'Content-Type': 'application/json',
			};
			const response = await axios.post('https://frs_react.deta.dev/v1/details', requestData, {headers});
			console.log(response.data)
      updateContext.setStudent_name(response.data.name)
      updateContext.setClass_Sections(response.data.class_name)
      updateContext.setFace_Img(response.data.url)
      updateContext.setSchool_name(response.data.school_name)
			// setPostData(response.data.data);
			// updateContext.setPercentage(response.data.percentage_data)
		  } catch (error) {
			// console.error(error);
		  }
		};
		fetchData();
	  }, [requestData]);

  

  return (
    <>
    <div className='bg-gray-300 md:h-screen'>
      <Sidebar />
        <div className='items-center justify-center  p-4 md:flex pt-20 md:pl-16'>
          {/* Login card */}
          <div className='bg-cover flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg text-gray-600 w-full md:flex-row'>
            {/* logo */}
            
            {/* <div className='backdrop-blur-sm backdrop-filter flex flex-col items-center justify-center p-4 text-white w-full md:w-1/2'>
            <Link to="/">
              <div className='flex flex-col justify-center items-center'>
              <h1 className='font-medium text-3xl'>FRS Tracker.</h1>
              <p className='italic text-lg'>For Attendance</p>
              </div>
            </Link>
            </div> */}
            

            {/* Form */}
            <div className='bg-white flex flex-col items-center p-4 space-y-6 w-full md:pt-8'>
              {/* Welcome */}
              <div className='flex flex-col items-center md:flex-row'>
                <div class="relative w-1/2 px-4 py-2 mr-5 md:-mr-16 ml-5 md:ml-0 flex items-center justify-center">
                 <img class=" object-center w-24 h-24 rounded-full border border-gray-100 shadow-sm" src={updateContext.userFace_Img} alt="user image" />
                </div>
                
                <div className=''>
                <div className='flex flex-col sm:flex-col ml-10 md:ml-0 gap-1'>
                  <h1 className='font-medium text-green-400 text-xl mb-2 mt-2 items-center flex justify-center mr-16 md:ml-0'><b>Details</b></h1>
                  <p className='mr-2'><b>Name: {updateContext.userStudent_name}</b></p>
                  <p className='mr-2'><b>Pin Number: {updateContext.userPin}</b></p>
                  <p><b>Class: {updateContext.userClass_Sections}</b></p>
                  <p>College: {updateContext.userSchool_name}</p>
                  <p><b>Percentage: {updateContext.userPercentage}</b></p>
                </div >
                </div>

                <div className='md:ml-12'>
                <Cands />
                </div>
              </div>
                
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard
