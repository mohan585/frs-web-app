import React, {useState} from 'react'
import Home from './components/Home'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AppContext from './components/dashboard_comps/Context';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

  const [pin, setPin] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [class_sections, setClass_Sections] = useState(null);
  const [face_img, setFace_Img] = useState(null);
  const [school_name, setSchool_name] = useState(null);
  const [student_name, setStudent_name] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [dob, setDOB] = useState(null);
  const [checkpin, setCheckPin] = useState(null);
  const [status, setStatus] = useState(null);

  const usersDetails = {
      userPin: pin,
      userAccessToken: accessToken,
      userClass_Sections: class_sections,
      userFace_Img: face_img,
      userSchool_name: school_name,
      userStudent_name: student_name,
      userPercentage: percentage,
      userDOB: dob,
      userCheckPin: checkpin,
      userStatus: status,

      setPin,
      setAccessToken,
      setClass_Sections,
      setFace_Img,
      setSchool_name,
      setStudent_name,
      setPercentage,
      setDOB,
      setStatus,
      setCheckPin,

  };

  return (
    <div>
      <AppContext.Provider value={{usersDetails}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          {/* <ProtectedRoute path="/dashboard" element={<Dashboard/>} auth={ isAuth}/> */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
