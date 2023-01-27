import React, {useContext,Fragment, useState} from 'react';
import AppContext from './Context';
import './styles.css';
import { FiCheck } from "react-icons/fi";
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const FormFinish = () => {

    const myContext = useContext(AppContext);
    const updateContext = myContext.userDetails;
    const [loading, setLoading] = useState(false);
    const name = updateContext.userStudent_name;
    const number = updateContext.userPhone;
    const pin = updateContext.userPin;

    const notify = () => toast.error("You are already registered", {
      position: toast.POSITION.TOP_CENTER
    });

    let [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();

    function closeModal() {
        setIsOpen(false)
        navigate("/login");
      }

      function openModal() {
        setIsOpen(true)
      }

    const finish = async() => {

      setLoading(true);
        // Pin checker
        // axios.post('https://frs_react.deta.dev/v1/checker',{
        //   "pin":updateContext.userPin,
        //   },{
        //   headers: {
        //     'accept': 'application/json',
        //     'Content-Type': 'application/json',
        // }
        // }).then(function ({ data }) {
        //     updateContext.setStatuss(data.status)
        // }).catch(function (response) {
        //     console.log(response);
        // });

      // if (updateContext.userStatuss === "True") {
      //   notify()
      // }
      // else if (updateContext.userStatuss === "False"){

      const response = await axios.post('https://frs_react.deta.dev/store/login',{
            "accessToken":updateContext.userAccessToken,
            "district_id":updateContext.userDistrict_id,
            "block_id":updateContext.userBlock_id,
            "school_id":updateContext.userSchool_id,
            "school_class_id":updateContext.userSchool_class_id,
            "student_id":updateContext.userStudent_id,
            "student_name":updateContext.userStudent_name,
            "school_name":updateContext.userSchool_name,
            "class_sections":updateContext.userClass_Sections,
            "pin":updateContext.userPin,
            "face_img":updateContext.userFace_Img,
            },{
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json',
          }
          });
          
          console.log(response.data) 

          const response1 = await axios.post('https://frs_react.deta.dev/store/student',{
            "pin":updateContext.userPin,
            "phone":updateContext.userPhone,
            "dob":updateContext.userDOB,
            "udise_id":updateContext.userUdise_id,
            "gender":updateContext.userGender,
            "unique_id":updateContext.userUnique,
            "enrolled_status":updateContext.userEnrolled_status,
            
            },{
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
          }
          });
          
          console.log(response1.data)
          setLoading(false);
        openModal()
    }

    // }
    return (
        <>
        <ToastContainer />
        <div className="flex flex-col items-center">
            <div className='space-y-2 items-center justify-center flex flex-col'>
            <p className='mt-4'>Verify Your Details</p>
            <p>Name: {name}</p>
            <p>Pin Number: {pin}</p>
            <p>Mobile: +91{number}</p>
            </div>
            <img className="h-20 w-20 mt-3" src="https://www.svgrepo.com/show/13650/success.svg" alt="successful" />
            <div className='mt-4'>
            <button className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500" onClick={async() => finish()}>{loading ? <div className='flex items-center justify-center'><svg className='absolute flex inset-y-0' class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div> :  "Done"}</button>
            </div>
        </div>

        {/* dailog box on completed */}
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Successfully Registered
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your data has been successfully submitted. Now you can login and check your attendance.
                    </p>
                  </div>

                  <div className="mt-4">
                    {/* <Link to="/login"> */}
                    <button
                      type="button"
                      className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500"
                      onClick={closeModal}
                    ><FiCheck className='mr-2' />
                      Done!
                    </button>
                    {/* </Link> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

        </>
    );
};

export default FormFinish;
