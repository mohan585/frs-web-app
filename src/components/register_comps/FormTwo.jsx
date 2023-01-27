import React, {useContext,useRef, useState, useEffect} from 'react';
import AppContext from './Context';
import './styles.css'
import { FaUser,FaCalendar,FaExpeditedssl,FaUserShield } from 'react-icons/fa'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormTwo = () => {
    const myContext = useContext(AppContext);
    const updateContext = myContext.userDetails;

    const [loading, setLoading] = useState(false);

    const notify = () => toast.error("Please enter the OTP correctly", {
        position: toast.POSITION.TOP_CENTER
      });
    const notify1 = () => toast.error("OTP Is Wrong!", {
        position: toast.POSITION.TOP_CENTER
      });
    
    const next = async() => {
        if (updateContext.userOTP == null || updateContext.userOTP.length !== 6) {
            // console.log('Please enter the OTP correctly')
            notify()
        } else if (updateContext.userOTP != null && updateContext.userOTP.length == 6){
            setLoading(true);
            try {
                const response = await axios.post('https://rnitfrs.ap.gov.in/api/v1/verify-student-otp',{"student_id":updateContext.userStudent_id,"district_id":updateContext.userDistrict_id,"role_id":updateContext.userRole_id,"audit_id":updateContext.userAudit_id,"OTP":updateContext.userOTP},{
                    headers: {
                        'Host': 'rnitfrs.ap.gov.in',
                        'a_type': 'web',
                        'referrer-policy': 'same-origin',
                        'servicecode': 'I0000',
                        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0.1; ONE A2003 Build/MMB29M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Mobile Safari/537.36',
                        'x-frame-options': 'SAMEORIGIN',
                        'access-control-allow-methods': 'GET, POST, PUT, OPTIONS',
                        'content-type': 'application/json',
                        'accept': 'application/json',
                        'cache-control': 'max-age=0, must-revalidate, no-store, nocache, private',
                        'content-security-policy': "default-src 'self'; connect-src *; font-src *; img-src * data:; media-src *; object-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline';",
                        'servicecodedept': 'D04',
                        'x-xss-protection': '1; mode=block',
                        'origin': 'https://rnitfrs.ap.gov.in',
                        'x-requested-with': 'com.rnitfrs.student',
                        'sec-fetch-site': 'same-origin',
                        'sec-fetch-mode': 'cors',
                        'sec-fetch-dest': 'empty',
                        'referer': 'https://rnitfrs.ap.gov.in/student-login',
                        'accept-language': 'en-US,en;q=0.9',
                    }
                  });

                if(response.data.message === "Sending the Access Token") {

                updateContext.setAccessToken(response.data.accessToken)
                updateContext.setBlock_id(response.data.userinfo.block_id)
                updateContext.setClass_Sections(response.data.userinfo.class_sections)
                updateContext.setEnrolled_status(response.data.userinfo.enrolled_status)
                updateContext.setFace_Img(response.data.userinfo.face_image)
                updateContext.setGender(response.data.userinfo.gender)
                updateContext.setRole_number(response.data.userinfo.role_number)
                updateContext.setSchool_class_id(response.data.userinfo.school_class_id)
                updateContext.setSchool_name(response.data.userinfo.school_name)
                updateContext.setStudent_name(response.data.userinfo.student_name)
                updateContext.setUdise_id(response.data.userinfo.udise_id)

                setLoading(false)
                updateContext.setStep(updateContext.currentPage + 1)
                }
                else if (response.data.message=== "Invalid OTP Details"){
                    notify1()
                    setLoading(false)
                    setShow(true)
                    setHide(false)
                }

              } catch (error) {
                setLoading(false);
                console.log(error);
              }


        }
        // else(updateContext.setStep(updateContext.currentPage + 1))
    };


    const [show,setShow]=useState(true)
    const [hide,setHide]=useState(false)

    const visible_change = () => {
        setShow(false);
        setHide(true)
        axios.post('https://rnitfrs.ap.gov.in/api/v1/validate-student-details',{"student_unique_id":updateContext.userUnique,"student_date_of_birth":updateContext.userDOB,"action":"verifyotp"},{
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
          }).then(function ({ data }) {
            // updateContext.setPhone(data.data.mobile_number)
            updateContext.setAudit_id(data.data.audit_id)
            updateContext.setRole_id(data.data.district_id)
            updateContext.setDistrict_id(data.data.role_id)

          }).catch(function (response) {
              console.log(response);
          });
    }

    return (
        <div className="flex flex-col items-center p-4 w-full md:w-1/1">
            <ToastContainer />
            {
                hide?<p >Enter the OTP recieved on +91 <b>{updateContext.userPhone}</b></p>:null
            }
            <div className='flex flex-col justify-center items-center'>
            {
                show?<p>Your Registered Mobile On Jnanabhumi Site</p>:null
            }
            {
                show?<p>+91<b>{updateContext.userPhone}</b></p>:null
            }
            </div>

            <img className="otpimg mt-4" src="https://ecall-messaging.com/wp-content/uploads/2020/11/eCall_Illustration_mTAN.svg" alt="otp-img" />
            <div className="formContain">
                <form className="flex flex-col items-center space-y-4">
                    {
                    show?<button className='bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500 mt-4' value="next" type='button' onClick={() => {visible_change()}}  >
                    <FaUser className='mr-2' />
                    Send OTP
                    </button>:null
                    }

                    <div className='relative'>
                    {
                    hide?<span className='absolute flex inset-y-0 items-center pl-3 text-gray-400 pointer-events-none'><FaUserShield className='mr-2' /></span>:null
                    }
                    {
                    hide?<input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" type="number" maxLength="6" placeholder="Enter OTP" onChange={e => updateContext.setOTP(e.target.value)} required/>:null
                    }
                    </div>

                    {
                    hide?<button className='bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500' value="next" type='button' onClick={async() => next()} >
                    {loading ? <div className='flex items-center justify-center'><svg className='absolute flex inset-y-0' class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div> :  "Verify"}
                    {/* <FaUser className='mr-2' />
                    Verify */}
                    </button>:null
                    }
                </form>
            </div>
        </div>
    );
};

export default FormTwo;