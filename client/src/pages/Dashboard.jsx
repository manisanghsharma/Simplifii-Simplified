import { useState, useEffect } from "react";
import {
	Menu,
	X,
	LogOut,
	RefreshCw,
	User,
	BookOpen,
	Calendar,
	Hash,
	ChevronRight,
	Heart,
} from "lucide-react";
import Logout from "../components/Logout";

const AttendanceUI = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [animatedAttendance, setAnimatedAttendance] = useState(0);
	const finalAttendance = 60;
	const requiredDays = 111;
	const targetDate = "10 October 2024";

	const studentInfo = {
		name: "John Doe",
		branch: "Computer Science",
		semester: "6th Semester",
		rollNo: "CS20B1001",
	};

	useEffect(() => {
		const animationDuration = 200;
		const steps = 60;
		const stepDuration = animationDuration / steps;
		let currentStep = 0;

		const timer = setInterval(() => {
			if (currentStep < steps) {
				setAnimatedAttendance(
					Math.ceil((finalAttendance / steps) * (currentStep + 1))
				);
				currentStep += 1;
			} else {
				clearInterval(timer);
			}
		}, stepDuration);

		return () => clearInterval(timer);
	}, []);

	const handleRefresh = () => {
		window.location.reload();
	};

	return (
		<div className='h-[100dvh] bg-indigo-50 relative flex flex-col'>
			{/* Sliding Menu */}
			<div
				className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className='p-4'>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-xl font-semibold'>Menu</h2>
						<button
							onClick={() => setIsMenuOpen(false)}
							className='p-2 hover:bg-indigo-50 rounded-md'
						>
							<X size={24} />
						</button>
					</div>
					<ul className='space-y-2'>
						<li>
							<button className='w-full text-left px-4 py-2 hover:bg-indigo-50 rounded-md flex items-center gap-2'>
								<User size={18} /> Profile
							</button>
						</li>
						<li>
							<button className='w-full text-left px-4 py-2 hover:bg-indigo-50 rounded-md flex items-center gap-2'>
								<BookOpen size={18} /> Courses
							</button>
						</li>
						<li>
							<button className='w-full text-left px-4 py-2 hover:bg-indigo-50 rounded-md flex items-center gap-2'>
								<Calendar size={18} /> Schedule
							</button>
						</li>
					</ul>
				</div>
			</div>

			{/* Overlay */}
			{isMenuOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-10'
					onClick={() => setIsMenuOpen(false)}
				></div>
			)}

			{/* Main Content */}
			<div className='relative z-0 flex-1 flex flex-col'>
				<nav className='bg-white shadow-md p-4'>
					<div className='flex justify-between items-center'>
						<button
							onClick={() => setIsMenuOpen(true)}
							className='p-2 hover:bg-indigo-50 rounded-md'
						>
							<Menu size={24} />
						</button>

						<div className='absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3'>
							<svg className='w-10 h-10 sm:w-8 sm:h-8' viewBox='0 0 100 100'>
								<rect
									x='20'
									y='20'
									width='60'
									height='60'
									rx='15'
									fill='#4F46E5'
								/>
								<text
									x='50'
									y='62'
									className='text-3xl font-bold'
									fill='white'
									textAnchor='middle'
								>
									SS
								</text>
							</svg>
							<h1 className='text-2xl font-bold text-gray-900 hidden md:block'>
								Simplifii Simplified
							</h1>
						</div>

						<Logout />
					</div>
				</nav>

				<main className='flex-1 max-w-lg mx-auto mt-8 px-4 pb-8'>
					{/* Student Info Card */}
					<div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='flex items-center gap-2'>
								<User className='text-gray-500' size={20} />
								<div>
									<p className='text-sm text-gray-500'>Name</p>
									<p className='font-medium'>{studentInfo.name}</p>
								</div>
							</div>
							<div className='flex items-center gap-2'>
								<BookOpen className='text-gray-500' size={20} />
								<div>
									<p className='text-sm text-gray-500'>Branch</p>
									<p className='font-medium'>{studentInfo.branch}</p>
								</div>
							</div>
							<div className='flex items-center gap-2'>
								<Calendar className='text-gray-500' size={20} />
								<div>
									<p className='text-sm text-gray-500'>Semester</p>
									<p className='font-medium'>{studentInfo.semester}</p>
								</div>
							</div>
							<div className='flex items-center gap-2'>
								<Hash className='text-gray-500' size={20} />
								<div>
									<p className='text-sm text-gray-500'>Roll No</p>
									<p className='font-medium'>{studentInfo.rollNo}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Attendance Card */}
					<div className='bg-white rounded-lg shadow-lg p-6 space-y-6'>
						<div className='text-center'>
							<h1 className='text-2xl font-semibold mb-4'>
								Attendance Overview
							</h1>
							<div className='relative pt-1'>
								<div className='overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200'>
									<div
										style={{ width: `${animatedAttendance}%` }}
										className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-1000 ease-out'
									></div>
								</div>
								<p className='text-3xl font-bold text-indigo-600 transition-all duration-1000'>
									{animatedAttendance}%
								</p>
							</div>
						</div>

						<div className='space-y-4 text-center'>
							<p className='text-gray-700'>
								You need to attend college for{" "}
								<span className='font-semibold text-black'>{requiredDays}</span>{" "}
								working days to achieve{" "}
								<span className='font-semibold text-black'>75%</span> attendance
							</p>

							<p className='text-gray-700'>
								That requires presence at every lecture until{" "}
								<span className='font-semibold text-black'>{targetDate}</span>
							</p>
						</div>

						<div className='pt-4 border-t flex justify-between items-center'>
							<button className='flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors'>
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
					</div>
				</main>

				<footer className='py-4 text-center text-gray-600'>
					<p className='flex items-center justify-center gap-1'>
						Made with{" "}
						<Heart
							size={16}
							fill='#EC4899'
							color='#EC4899'
							className='animate-pulse'
						/>{" "}
						by <span className='font-bold'>Manisangh</span>
					</p>
				</footer>
			</div>
		</div>
	);
};

export default AttendanceUI;
