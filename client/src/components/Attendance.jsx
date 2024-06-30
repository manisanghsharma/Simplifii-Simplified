import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { daysTo75, calcDays, formatDate } from "../Scripts/Attendance75";

const Attendance = ({
	token,
	setToken,
	attendanceApiUrl,
	attendance,
	setAttendance,
	setPass,
	setUser,
}) => {
	const [attLoad, setattLoad] = useState(false);
	const [current, setCurrent] = useState(0);
	const [total, setTotal] = useState(0);
	const getAttendance = async () => {
		try {
			setattLoad(true);
			const response = await axios.get(attendanceApiUrl, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			const attArr = response.data.response.data
			setAttendance(parseFloat(attArr[attArr.length-1].attendance_summary.Percent));
			setCurrent(attArr[attArr.length - 1].attendance_summary.Present);
			setTotal(attArr[attArr.length - 1].attendance_summary.Total);
		} catch (err) {
			console.log(err.message);
		} finally {
			setattLoad(false);
		}
	};
	useEffect(() => {
		
		getAttendance();
	}, []);

	return (
		<>
			<Navbar
				setToken={setToken}
				attLoad={attLoad}
				setPass={setPass}
				setUser={setUser}
				getAttendance={getAttendance}
			/>
			<div className='flex-col gap-8 lg:gap-10 flex m-auto max-w-[550px] w-[90%] h-[calc(100%-244px)] justify-center items-center text-pretty text-center'>
				{attendance != -1 && (
					<p className='text-[23px]'>
						Your attendance is{" "}
						<span className='font-medium'>{attendance}%</span>
					</p>
				)}
				{attendance < 75 && attendance != -1 && (
					<>
						<p className='text-[19px] text-gray-700'>
							You need to attend college for{" "}
							<span className='font-medium text-black'>
								{daysTo75(current, total)}
							</span>{" "}
							working days in order to achieve{" "}
							<span className='font-medium text-black'>75%</span> attendance
						</p>
						<span className='text-[19px] text-gray-700'>
							That requires presence at every lecture until{" "}
							<span className='font-medium text-black'>
								{formatDate(calcDays(daysTo75(current, total)))}
							</span>
						</span>
					</>
				)}
			</div>

			<Footer />
		</>
	);
};
export default Attendance;
