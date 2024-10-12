import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";
import { RefreshCw, ChevronRight, LoaderCircle } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { calcDays, formatDate, daysToX } from "../Scripts/Attendance75";
import axios from "axios";

const AttendanceCard = () => {
	const { attendance, setAttendance, token } = useContext(AppContext);
	const [isEditingTarget, setIsEditingTarget] = useState(false);
	const [targetAttendance, setTargetAttendance] = useState("");
	const [tempTarget, setTempTarget] = useState(75);
	const [attLoad, setattLoad] = useState(false);
	const [current, setCurrent] = useState(0);
	const [total, setTotal] = useState(0);
	const [animatedAttendance, setAnimatedAttendance] = useState(0);

	const controls = useAnimation();

	useEffect(() => {
		const initializeData = async () => {
			await getAttendance();
		};
		initializeData();
	}, []);

	const animateAttendance = (newAttendance) => {
		controls.start({
			width: `${newAttendance}%`,
			transition: { duration: 1, ease: "easeOut" },
		});

		setAnimatedAttendance(0);
		const animationDuration = 750; // 1 second
		const framesPerSecond = 60;
		const totalFrames = (animationDuration / 1000) * framesPerSecond;
		const increment = newAttendance / totalFrames;

		let currentFrame = 0;
		const intervalId = setInterval(() => {
			if (currentFrame < totalFrames) {
				setAnimatedAttendance((prev) =>
					Math.min(prev + increment, newAttendance)
				);
				currentFrame++;
			} else {
				clearInterval(intervalId);
			}
		}, 1000 / framesPerSecond);
	};

	useEffect(() => {
		if (attendance > 0) {
			if (attendance < 75) {
				setTargetAttendance(75);
			} else {
				setTargetAttendance(Math.ceil(attendance / 5) * 5);
			}

			animateAttendance(attendance);
		}
	}, [attendance]);

	const attendanceApiUrl =
		"https://abes.platform.simplifii.com/api/v1/custom/getCFMappedWithStudentID?embed_attendance_summary=1";

	const handleRefresh = async () => {
		setattLoad(true);
		setAnimatedAttendance(0);
		controls.start({ width: "0%" });
		await getAttendance();
	};

	const handleTargetChange = (e) => {
		const value = e.target.value;
		if (
			value === "" ||
			(/^\d{0,2}$/.test(value) && parseInt(value, 10) <= 99)
		) {
			setTempTarget(value);
		}
	};

	const handleTargetSubmit = () => {
		if (tempTarget < attendance) {
			setTargetAttendance(Math.ceil(attendance));
			setTempTarget(Math.ceil(attendance));
		} else {
			setTargetAttendance(tempTarget);
		}
		setIsEditingTarget(false);
	};

	const handleViewFullAttendance = () => {
		window.open(
			"https://abes.web.simplifii.com/dashboard.php?tab_id=2&config=student&h_tab_id=1&page=1"
		);
	};

	const getAttendance = async () => {
		try {
			setattLoad(true)
			const response = await axios.get(attendanceApiUrl, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			const attArr = response.data.response.data;
			const newAttendance = parseFloat(
				attArr[attArr.length - 1].attendance_summary.Percent
			);
			setAttendance(newAttendance);
			setCurrent(attArr[attArr.length - 1].attendance_summary.Present);
			setTotal(attArr[attArr.length - 1].attendance_summary.Total);

			// Trigger animation after setting new attendance
			animateAttendance(newAttendance);
		} catch (err) {
			console.log(err.message);
		} finally {
			setattLoad(false);
		}
	};
	return (
		<div className='bg-white rounded-lg shadow-lg p-6 space-y-3'>
			<div className='text-center'>
				<h1 className='text-2xl font-semibold mb-4'>Attendance Overview</h1>
				<div className='relative pt-1'>
					<div className='overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200'>
						<motion.div
							initial={{ width: "0%" }}
							animate={controls}
							className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600'
						></motion.div>
					</div>
					{attLoad ? (
						<div className='flex justify-center'>
							<LoaderCircle
								className='animate-spin text-indigo-600'
								size={36}
								strokeWidth={2.5}
							/>
						</div>
					) : (
						<p className='text-3xl font-bold text-indigo-600 transition-all duration-1000'>
							{animatedAttendance.toFixed(2)}%
						</p>
					)}
				</div>
			</div>

			<div className='space-y-4 text-center'>
				<p className='text-gray-700'>
					You need to attend college for{" "}
					{attLoad && (
						<LoaderCircle
							size={21}
							strokeWidth={2}
							className='mx-[6px] animate-spin inline-block'
						/>
					)}{" "}
					{!attLoad && (
						<span className='font-semibold text-black'>
							{daysToX(current, total, targetAttendance)}
						</span>
					)}{" "}
					working days to achieve{" "}
					{attLoad && (
						<LoaderCircle
							size={21}
							strokeWidth={2}
							className='mx-[6px] animate-spin inline-block'
						/>
					)}{" "}
					{!attLoad && (
						<span
							onClick={() => setIsEditingTarget(true)}
							className='cursor-pointer font-semibold text-black border-b border-dashed border-gray-400'
						>
							{targetAttendance}%
						</span>
					)}{" "}
					attendance
				</p>

				<p className='text-gray-700'>
					That requires presence at every lecture until{" "}
					{attLoad && (
						<LoaderCircle
							size={21}
							strokeWidth={2}
							className='mx-[6px] animate-spin inline-block'
						/>
					)}
					{!attLoad && (
						<span className='font-semibold text-black md:block'>
							{formatDate(calcDays(daysToX(current, total, targetAttendance)))}
						</span>
					)}
				</p>
			</div>

			<div className='pt-4 border-t flex justify-between items-center'>
				<button
					onClick={handleViewFullAttendance}
					className='flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors'
				>
					View full attendance
					<ChevronRight size={16} />
				</button>
				<button
					onClick={handleRefresh}
					className='p-2 hover:bg-indigo-50 rounded-md text-gray-600 hover:text-gray-700 transition-colors'
				>
					<RefreshCw size={20} />
				</button>
			</div>
			{isEditingTarget && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30'>
					<div className='bg-white rounded-lg p-6 w-80'>
						<h2 className='text-lg font-semibold mb-4'>
							Edit Target Attendance
						</h2>
						<div className='mb-4'>
							<label
								htmlFor='targetAttendance'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Target Percentage ({Math.ceil(attendance)}-99)
							</label>
							<input
								type='text'
								id='targetAttendance'
								value={tempTarget}
								onChange={handleTargetChange}
								className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
								placeholder='Enter target percentage'
							/>
						</div>
						<div className='flex justify-end gap-2'>
							<button
								onClick={() => setIsEditingTarget(false)}
								className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors'
							>
								Cancel
							</button>
							<button
								onClick={handleTargetSubmit}
								className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default AttendanceCard;
