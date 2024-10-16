import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Menu, X, Info, CircleUser, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const { setIsMenuOpen, isMenuOpen, setToken, setUser } =
		useContext(AppContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		setToken("");
		setUser("");
		window.localStorage.clear();
		Cookies.remove("ssjwt");
		navigate("/login");
	};

	return (
		<>
			<nav className='fixed top-0 left-0 right-0 bg-white shadow-md p-3 z-10'>
				<div className='flex justify-between items-center'>
					<button
						onClick={() => setIsMenuOpen(true)}
						className='p-2 hover:bg-indigo-50 rounded-md'
					>
						<Menu size={25} />
					</button>

					<div
						onClick={() => navigate("/dashboard")}
						className='cursor-pointer absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3'
					>
						<img
							src='assets/Logo.png'
							className='w-9 md:w-8'
							alt=''
							loading='lazy'
						/>
						<h1 className='text-2xl font-bold text-gray-900 hidden md:block'>
							Simplifii Simplified
						</h1>
					</div>
				</div>
			</nav>

			{/* Spacer to prevent content from being hidden under the fixed navbar */}
			<div className='h-[60px]'></div>

			<div
				className={`fixed inset-y-0 left-0 w-[220px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20 ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className='flex flex-col h-full'>
					<div className='p-4'>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-xl font-semibold'>Menu</h2>
							<button
								onClick={() => setIsMenuOpen(false)}
								className='p-2 hover:bg-indigo-50 rounded-md'
							>
								<X size={25} />
							</button>
						</div>
						<ul className='space-y-2'>
							<li>
								<Link to={"/dashboard"} onClick={() => setIsMenuOpen(false)}>
									<button className='w-full text-[16px] text-left px-3 py-3 hover:bg-indigo-50 rounded-md flex items-center gap-3'>
										<CircleUser size={22} /> Dashboard
									</button>
								</Link>
							</li>
							<li>
								<Link to={"/about"} onClick={() => setIsMenuOpen(false)}>
									<button className='w-full text-[16px] text-left px-3 py-3 hover:bg-indigo-50 rounded-md flex items-center gap-3'>
										<Info size={22} /> About
									</button>
								</Link>
							</li>
						</ul>
					</div>
					<div className='mt-auto p-2 border-t border-gray-200'>
						<button
							onClick={() => {
								setIsMenuOpen(false);
								handleLogout();
							}}
							className='w-full text-[16px] text-left px-5 py-3 hover:bg-indigo-50 rounded-md flex items-center gap-3 text-red-600'
						>
							<LogOut size={21} /> Logout
						</button>
					</div>
				</div>
			</div>

			{/* Overlay */}
			{isMenuOpen && (
				<div
					className='fixed inset-0 bg-black bg-opacity-50 z-10'
					onClick={() => setIsMenuOpen(false)}
				></div>
			)}
		</>
	);
};

export default Navbar;
