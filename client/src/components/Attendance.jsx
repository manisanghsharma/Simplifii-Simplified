import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Attendance = ({ token, setToken, attendanceApiUrl, attendance, setAttendance, setPass, setUser }) => {
	const [attLoad, setattLoad] = useState(false);
    const getAttendance = async () => {
			try {
				setattLoad(true);
				const response = await axios.get(attendanceApiUrl, {
					headers: {
						Authorization: "Bearer " + token,
					},
				});
				setAttendance(
					response.data.response.data[16].attendance_summary.Percent
				);
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
			<Navbar setToken={setToken} attLoad={attLoad} setPass={setPass} setUser={setUser} getAttendance = {getAttendance}/>
			<div className='p-4 flex justify-center items-center text-lg'>
				{attendance != -1 && <p>Your attendance is {attendance}</p>}
			</div>
		</>
	);
};
export default Attendance;
