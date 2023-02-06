import React, {useState} from 'react'
import ProgressBar from './register_comps/ProgressBar';
import AppContext from './register_comps/Context';
import FormOne from './register_comps/FormOne';
import FormTwo from './register_comps/FormTwo';
import FormFinish from './register_comps/FormFinish';
import { Link } from 'react-router-dom';

const Register = () => {

    const [step, setStep] = useState(1);
    const [pin, setPin] = useState(null);
    const [unique_id, setUnique] = useState(null);
    const [phone, setPhone] = useState(null);
    const [otp, setOTP] = useState(null);
    const [school_id, setSchool_id] = useState(null);
    const [student_id, setStudent_id] = useState(null);
    const [audit_id, setAudit_id] = useState(null);
    const [role_id, setRole_id] = useState(null);
    const [district_id, setDistrict_id] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [block_id, setBlock_id] = useState(null);
    const [class_sections, setClass_Sections] = useState(null);
    const [enrolled_status, setEnrolled_status] = useState(null);
    const [face_img, setFace_Img] = useState(null);
    const [gender, setGender] = useState(null);
    const [role_number, setRole_number] = useState(null);
    const [school_class_id, setSchool_class_id] = useState(null);
    const [school_name, setSchool_name] = useState(null);
    const [student_name, setStudent_name] = useState(null);
    const [udise_id, setUdise_id] = useState(null);
    const [dob, setDOB] = useState(null);
    const [statuss, setStatuss] = useState(false);



    const userDetails = {
        currentPage: step,
        userPin: pin,
        userUnique: unique_id,
        userPhone: phone,
        userOTP: otp,
        userSchool_id: school_id,
        userStudent_id: student_id,
        userAudit_id: audit_id,
        userRole_id: role_id,
        userDistrict_id: district_id,
        userAccessToken: accessToken,
        userBlock_id: block_id,
        userClass_Sections: class_sections,
        userEnrolled_status: enrolled_status,
        userFace_Img: face_img,
        userGender: gender,
        userRole_number: role_number,
        userSchool_class_id: school_class_id,
        userSchool_name: school_name,
        userStudent_name: student_name,
        userUdise_id: udise_id,
        userDOB: dob,
        userStatuss: statuss,


        setPin,
        setUnique,
        setPhone,
        setStep,
        setOTP,
        setSchool_id,
        setStudent_id,
        setAudit_id,
        setRole_id,
        setDistrict_id,
        setDOB,
        setAccessToken,
        setBlock_id,
        setClass_Sections,
        setEnrolled_status,
        setFace_Img,
        setGender,
        setRole_number,
        setSchool_class_id,
        setSchool_name,
        setStudent_name,
        setUdise_id,
        setStatuss,

    };

    // useEffect(() => console.log(unique_id), [unique_id]);
    // useEffect(() => console.log(dob), [dob]);

  return (
    <>
    <AppContext.Provider value={{userDetails}}>
      <div className=''>
        {/* Container */}
        <div className='bg bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 block h-screen items-center justify-center p-4 md:flex'>
          {/* Login card */}
          <div className='bg-cover bg-image flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg text-gray-600 w-full md:flex-row'>
            {/* logo */}

            {/* Form */}
            <div className='bg-white flex flex-col items-center p-4 space-y-8 w-full md:w-1/2'>
              {/* Welcome */}
              <div className='flex flex-col items-center'>
                <h1 className='font-medium text-green-400 text-xl'>Welcome!</h1>
                <p className=''>Register new account</p>
              </div>

              <div className="">
                 <ProgressBar />
                 <div className=''>
                 {step === 1 && <FormOne /> }
                 {step === 2 && <FormTwo /> }
                 {step === 3 && <FormFinish /> }
                 </div>
              </div>

              {/* links */}
              <div className='flex flex-col items-center'>
                <p className='italic  text-red-500'>**Enter Pin Correctly.**</p>
                <p className='italic mb-2 text-red-500'>**Otherwise Data Will be Deleted.**</p>
                <p className='italic'>
                  Already have Account?.
                  
                  <Link to="/login"><a className='ml-1 text-green-500 hover:underline' href='/login'>Log in</a></Link>
                </p>
              </div>
            </div>

            <div className='backdrop-blur-sm backdrop-filter flex flex-col items-center justify-center p-4 text-white w-full md:w-1/2'>
              <Link to="/">
              <div className='flex flex-col items-center justify-center'>
              <h1 className='font-medium text-3xl'>FRS Tracker.</h1>
              <p className='italic text-lg'>For Attendance</p>
              </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
      </AppContext.Provider>
    </>
  )
}

export default Register