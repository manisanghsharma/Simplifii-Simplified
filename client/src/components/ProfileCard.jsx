import React, { useState, useEffect } from "react";
import { User, BookOpen, Calendar, Hash } from "lucide-react";

const ProfileCard = () => {
	const [profileData, setProfileData] = useState({
		semester: "",
		branch: "",
		name: "",
		user: "",
	});

	useEffect(() => {
		const loadProfileData = () => {
			setProfileData({
				semester: localStorage.getItem("sssemester") || "",
				branch: localStorage.getItem("ssbranch") || "",
				name: localStorage.getItem("ssname") || "",
				user: localStorage.getItem("ssroll") || "",
			});
		};

		loadProfileData();

		// Set up an interval to check for updates
		const intervalId = setInterval(loadProfileData, 10); // Check every second

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='flex items-center gap-2'>
					<User className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Name</p>
						<p className='font-medium'>{profileData.name}</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<BookOpen className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Branch</p>
						<p className='font-medium'>{profileData.branch}</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<Calendar className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Semester</p>
						<p className='font-medium'>{profileData.semester}</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<Hash className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Roll No</p>
						<p className='font-medium'>{profileData.user}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
