import React, { useContext,useRef,useState } from 'react';
import AppContext from './Context';
import './styles.css';
import { FaUser,FaCalendar,FaExpeditedssl } from 'react-icons/fa'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const FormOne = () => {
    const myContext = useContext(AppContext);
    const updateContext = myContext.userDetails;

    const [loading, setLoading] = useState(false);

    const notify = () => toast.error("Please enter your Pin Number", {
        position: toast.POSITION.TOP_CENTER
      });

      const notify1 = () => toast.error("Please enter your Unique Id correctly.", {
        position: toast.POSITION.TOP_CENTER
      });

      const notify2 = () => toast.error("Please enter your DOB correctly.", {
        position: toast.POSITION.TOP_CENTER
      });
      const notify3 = () => toast.error("You are already registered.", {
        position: toast.POSITION.TOP_CENTER
      });
      const notify4 = () => toast.error("Invalid Student Unique Id.", {
        position: toast.POSITION.TOP_CENTER
      });
      const notify5 = () => toast.error("Date Of Birth is not matching, please corret it.", {
        position: toast.POSITION.TOP_CENTER
      });
    

    const next = async() => {
        if (updateContext.userPin == null) {
            // console.log('Please enter your Pin Number')
            notify()
            
        } else if (updateContext.userUnique == null) {
            // console.log('Please enter your Unique Id correctly')
            notify1()
        } 
        else if (updateContext.userDOB == null) {
            // console.log('Please enter your DOB correctly')
            notify2()
        }
        else if (updateContext.userDOB != null && updateContext.userUnique != null) {
            setLoading(true);

            try {
                const response = await axios.post('https://frs_react.deta.dev/v1/register_checker',{
                  "pin":updateContext.userPin,
                },{
                  headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                  }
                });

                if(response.data.pin === true) {
                    notify3()
                    setLoading(false)
                }else if (response.data.pin === false) {

                    const response1 = await axios.post('https://rnitfrs.ap.gov.in/api/v1/validate-student-details',{"student_unique_id":updateContext.userUnique,"student_date_of_birth":updateContext.userDOB},{
                        headers: {
                
                          'a_type': 'web',
                          'referrer-policy': 'same-origin',
                          'servicecode': 'I0000',
                          'x-frame-options': 'SAMEORIGIN',
                          'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
                          'content-type': 'application/json',
                          'accept': 'application/json',
                          'cache-control': 'max-age=0, must-revalidate, no-store, nocache, private',
                          'content-security-policy': "default-src 'self'; connect-src *; font-src *; img-src * data:; media-src *; object-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';",
                          'servicecodedept': 'D04',
                          'x-xss-protection': '1; mode=block',
                          'x-requested-with': 'com.rnitfrs.student',
                          'accept-language': 'en-US,en;q=0.9',
                      }
                      })

                      if (response1.data.message === "Invalid Student Unique Id") {
                        notify4()
                        setLoading(false)
                      } else if(response1.data.message === "Student Unique Id and date of birth is not matching, please update details in Jnanabhumi portal") {
                        notify5()
                        setLoading(false)
                      }
                      else {
                        updateContext.setPhone(response1.data.data.mobile_number)
                        updateContext.setSchool_id(response1.data.data.school_id)
                        updateContext.setStudent_id(response1.data.data.student_id)
                        setLoading(false);
                        updateContext.setStep(updateContext.currentPage + 1)
                    }
                    //   .then(function ({ data }) {
                    //       updateContext.setPhone(data.data.mobile_number)
                    //       updateContext.setSchool_id(data.data.school_id)
                    //       updateContext.setStudent_id(data.data.student_id)
                          
                    //   }).catch(function (response) {
                    //       console.log(response);
                    //   });
                }
              } catch (error) {
                setLoading(false);
                console.log(error);
              }

            
        } 
        // else (updateContext.setStep(updateContext.currentPage + 1))
    };

    const ref = useRef();

    const[userPin,setPin]=useState('');

    const changeCase=(event)=>{
        event.preventDefault();
        setPin(event.target.value.toUpperCase());
        updateContext.setPin(event.target.value)
    }

    return (
        <div className="">
            <ToastContainer />
            <p className='flex flex-auto pb-3 items-center justify-center mt-4'>Enter Your Details</p>
            <form className="flex flex-col items-center space-y-4">
                <div className='relative'>
                <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400 pointer-events-none'><FaUser className='mr-2' /></span>
                <input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" type="text" placeholder="Pin Number" maxLength="10" required value={userPin} onChange={changeCase} />
                </div>
                <div className='relative'>
                <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400 pointer-events-none'><FaExpeditedssl className='mr-2' /></span>
                <input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" type="number" placeholder="Unique Id" maxLength="12" onChange={e => updateContext.setUnique(e.target.value)} required/>
                </div>
                <div className='relative'>
                <span className='absolute flex inset-y-0 items-center pl-3 text-gray-400 pointer-events-none'><FaCalendar className='mr-2' /></span>
                <input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" type="text" placeholder="DOB" ref={ref}  onChange={e => updateContext.setDOB(e.target.value)} onFocus={() => {(ref.current.type = "date")}} onBlur={() => (ref.current.type = "date")} required/>
                </div>
                <button className='bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500' type='button' onClick={async() => next()} >
                  {/* <FaUser className='mr-2' />
                  Next */}
                  {loading ? <div className='flex items-center justify-center'><svg className='absolute flex inset-y-0' class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div> :  "Next"}
                </button>
            </form>
        </div>
    );
};

export default FormOne;