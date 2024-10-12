import { useState, useEffect, useContext } from "react";
import {
	X,
	Info,
} from "lucide-react";
import Logout from "../components/Logout";
import AttendanceCard from "../components/AttendanceCard";
import ProfileCard from "../components/ProfileCard";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const AttendanceUI = () => {
	const {isMenuOpen, setIsMenuOpen} = useContext(AppContext)
    
	return (
		<div className='h-[100dvh] bg-indigo-50 relative flex flex-col'>
			{/* Sliding Menu */}

			{/* Main Content */}
			<div className='relative z-0 flex-1 flex flex-col'>
				<Navbar />

				<main className='flex-1 max-w-lg mx-auto mt-8 px-4 pb-8'>
					{/* Student Info Card */}
					<ProfileCard />

					{/* Attendance Card */}
					<AttendanceCard />
				</main>

				{/* <Footer /> */}
				<footer className='text-gray-600 font-medium py-2 text-center'>
					<p>
						&copy; {new Date().getFullYear()} Simplifii Simplified. All rights
						reserved.
					</p>
				</footer>
			</div>
		</div>
	);
};

export default AttendanceUI;
