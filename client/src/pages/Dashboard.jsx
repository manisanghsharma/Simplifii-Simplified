import { useState, useEffect, useContext } from "react";
import {
	Menu,
	X,
	User,
	BookOpen,
	Calendar,
	Heart,
} from "lucide-react";
import Logout from "../components/Logout";
import AttendanceCard from "../components/AttendanceCard";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import Footer from "../components/Footer";

const AttendanceUI = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
    
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
                    <ProfileCard />
					

					{/* Attendance Card */}
                    <AttendanceCard />
				</main>

				<Footer />
			</div>
		</div>
	);
};

export default AttendanceUI;
