import dayjs from "dayjs";
import React, { useState, useEffect,useContext } from "react";
import { GenerateDate, months } from "./Calendar";
import ClassNames from "./classNames";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TfiReload } from "react-icons/tfi"
import axios from 'axios';
import AppContext from './Context';

export default function Calendar() {

	const myContext = useContext(AppContext);
    const updateContext = myContext.usersDetails;

	const days = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);

	useEffect(() => {
		let start_date = `${today.year()}-${(today.month() + 1).toString().padStart(2, "0")}-01`;
		let end_date = `${today.year()}-${(today.month() + 1).toString().padStart(2, "0")}-${today.daysInMonth()}`;
		if (selectDate.month() === today.month() && selectDate.year() === today.year()) {
			end_date = `${selectDate.year()}-${(selectDate.month() + 1).toString().padStart(2, "0")}-${selectDate.endOf(selectDate.month()+1).date()}`;
		  }
		

		setRequestData({
		  "pin": updateContext.userPin,
		  "start_date": start_date,
		  "end_date": end_date,
		});

	  }, [today.month()+1]);

	const [postData, setPostData] = useState([]);
	const [requestData, setRequestData] = useState({
		// "pin": "20T91A0535",
		// "start_date": start_date,
		// "end_date": end_date,
		// "status": false
		  });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const headers = {
				'accept': 'application/json',
				'Content-Type': 'application/json',
			};
			const response = await axios.post('https://frs_react.deta.dev/v1/monthly_data', requestData, {headers});
			// console.log(response.data.data)
			setPostData(response.data.data);
			updateContext.setPercentage(response.data.percentage_data)
			setLoading(false);
		  } catch (error) {
			// console.error(error);
			setLoading(false);
		  }
		};
		fetchData();
	  }, [requestData]);

	function handleSubmit() {
		let start_date = `${today.year()}-${(today.month() + 1).toString().padStart(2, "0")}-01`;
		let end_date = `${today.year()}-${(today.month() + 1).toString().padStart(2, "0")}-${today.daysInMonth()}`;
		if (selectDate.month() === today.month() && selectDate.year() === today.year()) {
			end_date = `${selectDate.year()}-${(selectDate.month() + 1).toString().padStart(2, "0")}-${selectDate.endOf(selectDate.month()+1).date()}`;
		  }
		setRequestData({
			"pin": updateContext.userPin,
			"start_date": start_date,
			"end_date": end_date,
			  });
	  }


	return (
		<div className="flex gap-10 sm:divide-x justify-center mx-auto items-center sm:flex-row flex-col pt-12 md:pt-0 pb-24 ">
			<div className="w-80 h-80 ">
				<div className="flex justify-between items-center">
					<h1 className="select-none font-semibold">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="flex gap-10 items-center ">
						<TfiReload className="w-5 h-5 cursor-pointer hover:scale-105 transition-all" onClick={handleSubmit}/>
						<GrFormPrevious
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className=" cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(currentDate);
							}}
						>
							<button type="button" className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500">Today</button>
						</h1>
						{/* <GrFormNext
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/> */}
					</div>
				</div>
				<div className="grid grid-cols-7 ">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className=" grid grid-cols-7 ">
					
					{GenerateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							const attendanceStatus = postData.find(item => dayjs(item.date).toDate().toDateString() === date.toDate().toDateString());
							console.log()
							let className = "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none ";;
							if (attendanceStatus) {
								
								if (attendanceStatus.attendanceStatus === 'A') {
								  className += "bg-red-400 text-white ";
								} else if (attendanceStatus.attendanceStatus === 'SU') {
								  className += "bg-yellow-500 text-white ";
								} else if (attendanceStatus.attendanceStatus === 'P') {
								  className += "bg-green-400 text-white ";
								} else if (attendanceStatus.attendanceStatus === 'HO') {
								  className += "bg-yellow-300 text-black ";
								} else {
								  className += "bg-gray-300 text-white ";
								}

							} else {
								className += ClassNames(currentMonth ? "" : "text-gray-400 ") ;
							}
							
							return (
								<div
									key={index}
									className="p-2 text-center h-14 grid place-content-center text-sm border-t"
								>
									<h1 className={className}
									>
										{date.date()}
									</h1>

								</div>
							);
						}
					)}
				</div>
			</div>
		</div>
	);
}