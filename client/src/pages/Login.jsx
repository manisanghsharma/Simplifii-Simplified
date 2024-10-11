import React, { useContext, useState } from "react";
import Cookies from 'js-cookie'
import { Heart, User, Lock, Eye, EyeOff } from "lucide-react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const {user, setUser, setToken, error, setError, setName} = useContext(AppContext)
	const [loading, setLoading] = useState(false);
	const [pass, setPass] = useState("")
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate()
	const loginApiUrl =
		"https://abes.platform.simplifii.com/api/v1/admin/authenticate";

	
	const handleLogin = async(e) => {
		try {
			e.preventDefault()
			setLoading(true);
			const response = await axios.postForm(loginApiUrl, {
				username: user,
				password: pass,
			});
			Cookies.set('ssroll', user)
			Cookies.set('ssname', response.data.response.name) 
			setToken(response.data.token);
			Cookies.set("ssjwt", response.data.token, {
				expires: 100,
			});
			setError("");
			navigate('/dashboard')


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
		<div className='min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col'>
			<div className='flex-1 flex flex-col items-center justify-center px-4 py-12'>
				<div className='w-full max-w-md'>
					<div className='flex flex-col items-center mb-10'>
						<svg
							className='w-20 h-20 mb-3 drop-shadow-lg'
							viewBox='0 0 100 100'
						>
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

							<button
								type='submit'
								className='w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors font-medium'
							>
								Sign in
							</button>
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

			<footer className='py-4 text-center text-gray-600'>
				<p className='flex items-center justify-center text-sm'>
					Made with
					<Heart className='h-4 w-4 mx-1 text-pink-500 fill-current' />
					by <span className='font-semibold'>Manisangh</span>
				</p>
			</footer>
		</div>
	);
}

export default Login