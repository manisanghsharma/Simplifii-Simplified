import AttendanceCard from "../components/AttendanceCard";
import ProfileCard from "../components/ProfileCard";
import Navbar from "../components/Navbar";

const AttendanceUI = () => {
	return (
		<div className='h-[100dvh] bg-indigo-50 relative flex flex-col'>

			{/* Main Content */}
			<div className='relative z-0 flex-1 flex flex-col'>
				<Navbar />

				<main className='flex-1 max-w-lg mx-auto mt-6 px-4 pb-8'>
					{/* Student Info Card */}
					<ProfileCard />

					{/* Attendance Card */}
					<AttendanceCard />
				</main>

				{/* <Footer /> */}
				<footer className='text-gray-600 text-sm font-medium py-2 text-center'>
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
