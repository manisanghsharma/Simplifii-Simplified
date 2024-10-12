import React, { useContext, useState } from "react";
import Cookies from 'js-cookie'
import { User, Lock, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { AppContext } from "../contexts/AppContext";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toTitleCase } from "../Scripts/Attendance75";

const Login = () => {
	const {user, setUser, setToken, error, setError} = useContext(AppContext)
	const [loading, setLoading] = useState(false);
	const [pass, setPass] = useState("")
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate()
	const loginApiUrl =
		"https://abes.platform.simplifii.com/api/v1/admin/authenticate";
	const attendanceApiUrl =
		"https://abes.platform.simplifii.com/api/v1/custom/getCFMappedWithStudentID?embed_attendance_summary=1";

	
const handleLogin = async (e) => {
	try {
		e.preventDefault();
		setLoading(true);

		// First API call
		const response = await axios.postForm(loginApiUrl, {
			username: user,
			password: pass,
		});

		const token = response.data.token;

		// Set items in localStorage
		localStorage.setItem("ssroll", user.toUpperCase());
		localStorage.setItem("ssname", toTitleCase(response.data.response.name));

		// Set token in state and cookie
		setToken(token);
		Cookies.set("ssjwt", token);

		// Second API call
		const response2 = await axios.get(attendanceApiUrl, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		// Set additional items in localStorage
		localStorage.setItem(
			"sssemester",
			response2.data.response.data[0].semester
		);
		localStorage.setItem("ssbranch", response2.data.response.data[0].dept);

		setError("");

		// Navigate after all operations are complete
		navigate("/dashboard");
	} catch (err) {
		console.log(err.message);
		setError("Invalid username or password");
	} finally {
		setLoading(false);
	}
};
	

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className='min-h-[100dvh] bg-gradient-to-b from-indigo-50 to-white flex flex-col'>
			<div className='flex-1 flex flex-col items-center justify-center px-4 py-12'>
				<div className='w-full max-w-md'>
					<div className='flex flex-col items-center mb-10'>
						<img
							src='assets/Logo.png'
							className='w-12 mb-4 drop-shadow-lg'
							alt=''
						/>
						<h1 className='text-3xl font-bold text-center text-gray-900 mb-2'>
							Simplifii Simplified
						</h1>
						<div className='h-1 w-20 bg-indigo-500 rounded mb-6'></div>
						<p className='text-xl text-gray-600 font-medium'>
							Login to ABES Simplifii
						</p>
					</div>
					<div className='bg-white p-8 rounded-2xl shadow-lg'>
						<form onSubmit={(e) => handleLogin(e)} className='space-y-6'>
							<div className='space-y-5'>
								<div>
									<label
										htmlFor='username'
										className='text-sm font-medium text-gray-700 mb-1 block'
									>
										Username
									</label>
									<div className='relative'>
										<input
											id='username'
											type='text'
											value={user}
											onChange={(e) => setUser(e.target.value)}
											className='pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors'
											placeholder='Enter your username'
										/>
										<User className='h-5 w-5 text-gray-400 absolute left-3 top-2.5' />
									</div>
								</div>
								<div>
									<label
										htmlFor='password'
										className='text-sm font-medium text-gray-700 mb-1 block'
									>
										Password
									</label>
									<div className='relative'>
										<input
											id='password'
											type={showPassword ? "text" : "password"}
											value={pass}
											onChange={(e) => setPass(e.target.value)}
											className='pl-10 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-colors'
											placeholder='Enter your password'
										/>
										<Lock className='h-5 w-5 text-gray-400 absolute left-3 top-2.5' />
										<button
											type='button'
											onClick={togglePasswordVisibility}
											className='absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none'
										>
											{showPassword ? (
												<EyeOff className='h-5 w-5' />
											) : (
												<Eye className='h-5 w-5' />
											)}
										</button>
									</div>
								</div>
							</div>

							{!loading && (
								<button
									type='submit'
									className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors font-medium'
								>
									Sign in
								</button>
							)}

							{loading && (
								<button
									type='submit'
									className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors font-medium'
								>
									<LoaderCircle className='animate-spin' size={22} />
								</button>
							)}
						</form>
					</div>

					{/* Error message container below the login card */}
					<div className='h-8 flex items-center justify-center mt-4'>
						{error && (
							<p className='text-sm text-red-500 font-medium'>{error}</p>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default Login