import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';


const PrivateRoute = ({ component: component, ...rest }) => {
	const cookies = new Cookies();
	const cookie = cookies.get('pin_number');
  	return cookie ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;