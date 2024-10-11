import { LogOut } from "lucide-react";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
	const { setToken } = useContext(AppContext);
	const navigate = useNavigate();
	const handleLogout = () => {
		setToken("");
		Cookies.remove("ssjwt");
		navigate("/login");
	};
	return (
		<button
			onClick={handleLogout}
			className='flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-indigo-50'
		>
			<LogOut size={18} />
			<span className='hidden sm:inline'>Logout</span>
		</button>
	);
};
export default Logout;
