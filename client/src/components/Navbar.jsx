import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Menu, X, Info, CircleUser, LogOut } from "lucide-react";
import Cookies from 'js-cookie'
import Logout from "../components/Logout";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
	const {setIsMenuOpen, isMenuOpen, setToken, setUser} = useContext(AppContext)
	const {navigate} = useNavigate()
	const handleLogout = () => {
		setToken("");
		setUser("");
		Cookies.remove("ssjwt");
		navigate("/login");
	};
  return (
		<nav className='bg-white shadow-md p-4'>
			<div className='flex justify-between items-center'>
				<button
					onClick={() => setIsMenuOpen(true)}
					className='p-2 hover:bg-indigo-50 rounded-md'
				>
					<Menu size={30} />
				</button>

				<div className='absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3'>
					<img
						src='https://imgur.com/ueT2euv.png'
						className='w-9 md:w-8'
						alt=''
					/>
					<h1 className='text-2xl font-bold text-gray-900 hidden md:block'>
						Simplifii Simplified
					</h1>
				</div>

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
								<X size={30} />
							</button>
						</div>
						<ul className='space-y-2'>
							{/* <li>
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
						</li> */}
							<li>
								<Link to={"/dashboard"} onClick={() => setIsMenuOpen(false)}>
									<button className='w-full text-[17px] text-left px-4 py-2 hover:bg-indigo-50 rounded-md flex items-center gap-3'>
										<CircleUser size={22} /> Dashboard
									</button>
								</Link>
								<Link to={"/about"} onClick={() => setIsMenuOpen(false)}>
									<button className='w-full text-[17px] text-left px-4 py-2 hover:bg-indigo-50 rounded-md flex items-center gap-3'>
										<Info size={22} /> About
									</button>
								</Link>
							</li>
						</ul>
						<div className='p-4 border-t border-gray-200'>
							<button
								onClick={() => {
									setIsMenuOpen(false);
									handleLogout();
								}}
								className='w-full text-[17px] text-left px-4 py-2 hover:bg-indigo-50 rounded-md flex items-center gap-3 text-red-600'
							>
								<LogOut size={22} /> Logout
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

				{/* <Logout /> */}
			</div>
		</nav>
	);
}
export default Navbar