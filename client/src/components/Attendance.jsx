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
	const [date, setDate] = useState("")
	const getAttendance = async () => {
		try {
			setattLoad(true);
			const response = await axios.get(attendanceApiUrl, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setAttendance(parseFloat(response.data.response.data[16].attendance_summary.Percent));
			setCurrent(response.data.response.data[16].attendance_summary.Present);
			setTotal(response.data.response.data[16].attendance_summary.Total);
		} catch (err) {
			console.log(err.message);
		} finally {
			setattLoad(false);
		}
	};
	useEffect(() => {
		getAttendance();
		setDate(formatDate(calcDays(daysTo75(current, total))))
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
			<div className='flex-col gap-8 flex m-auto max-w-[400px] w-[85%] h-[calc(100vh-205px)] justify-center items-center text-center'>
				{attendance != -1 && (
					<p className='text-[22px]'>
						Your attendance is{" "}
						<span className='font-medium'>{attendance}%</span>
					</p>
				)}
				{attendance < 75 && (
					<>
						<p className='text-[19px] text-gray-700'>
							You need to attend college for{" "}
							<span className='font-medium text-black'>{daysTo75(current, total)}</span>{" "}
							working days to achieve 75% attendance
						</p>
						<span className='text-[19px] text-gray-700'>
							That requires presence at every lecture until{" "}
							<span className='font-medium text-black'>{date}</span>
						</span>
					</>
				)}
			</div>

			<Footer />
		</>
	);
};
export default Attendance;
