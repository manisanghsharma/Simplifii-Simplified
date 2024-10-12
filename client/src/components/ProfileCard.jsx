import { useState, useEffect, useContext } from "react";
import {
	User,
	BookOpen,
	Calendar,
	Hash,
} from "lucide-react";
import Cookies from 'js-cookie'
import { toTitleCase } from "../Scripts/Attendance75";
const ProfileCard = () => {
	const [semester, setSemester] = useState(Cookies.get('sssemester') || '')
	const [branch, setBranch] = useState(Cookies.get("ssbranch") || "");
	return (
		<div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
			<div className='grid grid-cols-2 gap-4'>
				<div className='flex items-center gap-2'>
					<User className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Name</p>
						<p className='font-medium'>{toTitleCase(Cookies.get('ssname'))}</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<BookOpen className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Branch</p>
						<p className='font-medium'>{branch}</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<Calendar className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Semester</p>
						<p className='font-medium'>{semester}</p>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<Hash className='text-gray-500' size={20} />
					<div>
						<p className='text-sm text-gray-500'>Roll No</p>
						<p className='font-medium'>{Cookies.get('ssroll')}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfileCard;
