import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
			<Navbar
				setToken={setToken}
				attLoad={attLoad}
				setPass={setPass}
				setUser={setUser}
				getAttendance={getAttendance}
			/>
			<div className='flex w-full h-[calc(50vh)] justify-center items-center'>
				{attendance != -1 && (
					<p className='text-xl'>
						Your attendance is <span className="font-medium">{attendance}</span>
					</p>
				)}
			</div>
        <Footer/>
		</>
	);
};
export default Attendance;
