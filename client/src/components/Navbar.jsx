import { RefreshCw } from "lucide-react";
import Cookies from 'js-cookie'
const Navbar = ({setToken, attLoad, getAttendance, setUser, setPass}) => {
	const logout = () => {
		Cookies.remove("jwt");
		setToken("");
        setPass("");
        setUser("");
	};
	return (
		<div className="flex items-end justify-end gap-4 p-4 text-[18px]">
			<button
				onClick={logout}
				className='border-black border-2 rounded-md px-3 py-1 top-3 right-3'
			>
				Logout
			</button>
			<button onClick={getAttendance} className='border-black border-2 rounded-md px-3 py-1 size-fit' >
				<RefreshCw size={24}  className={`${attLoad && "animate-spin"}`}/>
			</button>
		</div>
	);
};
export default Navbar;
