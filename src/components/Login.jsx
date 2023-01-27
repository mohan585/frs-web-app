import React, { useState, useContext, useRef, useEffect } from 'react'
import AppContext from './dashboard_comps/Context';
import { FaUser } from 'react-icons/fa'
import { FaCalendar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate  } from "react-router-dom";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FiCommand } from "react-icons/fi";


const Login = () => {

  const myContext = useContext(AppContext);
  const updateContext = myContext.usersDetails;

  const pin = updateContext.userPin;
  const dob = updateContext.userDOB;

  const[userPin,setPin]=useState('');
  const [loading, setLoading] = useState(false);

  const changeCase=(event)=>{
    event.preventDefault();
    setPin(event.target.value.toUpperCase());
    updateContext.setPin(event.target.value)
  }

  const ref = useRef();
  const navigate = useNavigate();
  const cookies = new Cookies();


  const notify = () => toast.error("Please enter your Pin Number", {
    position: toast.POSITION.TOP_CENTER
  });

  const notify1 = () => toast.error("Please enter your DOB", {
    position: toast.POSITION.TOP_CENTER
  });

  const notify2 = () => toast.error("DOB is Invalid", {
    position: toast.POSITION.TOP_CENTER
  });

  const notify3 = () => toast.error("Pin No. is Invalid Please register", {
    position: toast.POSITION.TOP_CENTER
  });



const next = async() => {

  if (updateContext.userPin == null) {
      // console.log('Please enter your Pin Number')
      notify()
  }
  else if (updateContext.userDOB == null) {
      // console.log('Please enter your DOB correctly')
      notify1()
  } else {
    setLoading(true);
    try {
      const response = await axios.post('https://frs_react.deta.dev/v1/login_checker',{
        "pin":updateContext.userPin,
      },{
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      setLoading(false);

      if(response.data.detailsTrue === true) {
        if(updateContext.userDOB === response.data.dob) {

          cookies.set('pin_number', pin, { path: '/' });
          cookies.set('dob', dob, { path: '/' });
          cookies.set('isLogged', true, { path: '/' });
          navigate("/dashboard");
        } else{
          notify2()
          }
      }else if (response.data.detailsTrue === false) {
        notify3()
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
}

  useEffect(() => {
    const cookie = cookies.get('pin_number');
    const dob = cookies.get('dob');


    if (cookie && dob) {
      navigate("/dashboard");
    }
  }, []);


  return (
    <>
      <div className=''>

        <ToastContainer />
        {/* Container */}
        <div className='bg bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 block h-screen items-center justify-center p-4 md:flex'>
          {/* Login card */}
          <div className='bg-cover bg-image flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg text-gray-600 w-full md:flex-row'>
            {/* logo */}
            
            <div className='backdrop-blur-sm backdrop-filter flex flex-col items-center justify-center p-4 text-white w-full md:w-1/2'>
            <Link to="/">
              <div className='flex flex-col justify-center items-center'>
              <h1 className='font-medium text-3xl'>FRS Tracker.</h1>
              <p className='italic text-lg'>For Attendance</p>
              </div>
            </Link>
            </div>
            

            {/* Form */}
            <div className='bg-white flex flex-col items-center p-4 space-y-8 w-full md:w-1/2'>
              {/* Welcome */}
              <div className='flex flex-col items-center'>
                <h1 className='font-medium text-green-400 text-xl'>Welcome Back</h1>
                <p className=''>Login to your account</p>
              </div>

              {/* inputs */}
              <div className='flex flex-col items-center space-y-4'>
                <div className='relative'>
                  <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400'><FaUser className='mr-2' /></span>
                  <input className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300' placeholder='Pin Number' type="text" maxLength="10" value={userPin} onChange={changeCase} required/>
                </div>
                <div className='relative'>
                  <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400'><FaCalendar className='mr-2' /></span>
                  <input type="text" className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300' placeholder='DOB...' ref={ref}  onChange={e => updateContext.setDOB(e.target.value)} onFocus={() => {(ref.current.type = "date")}} onBlur={() => (ref.current.type = "date")} required/>
                </div>
                {/* <Link to="/dashboard"> */}
                <button className='bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500'  onClick={async() => next()}>
                  {/* <FaUser className='mr-2' /> */}

                  {/* {loading ? <FiCommand className="loading-icon" /> :  "Login Now"} */}
                  {loading ? <div className='flex items-center justify-center'><svg className='absolute flex inset-y-0' class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div> :  "Login Now"}
                  
                  {/* Login now */}
                </button>
                {/* </Link> */}
              </div>

              {/* links */}
              <div className='flex flex-col items-center'>
                <p className='italic'>
                  Join us now.
                  
                  <Link to="/register"><a href="" className='ml-1 text-green-500 hover:underline'>Register here</a></Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Login