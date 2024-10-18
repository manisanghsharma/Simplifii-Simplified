import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
	const [user, setUser] = useState("")  ;
	const [test, setTest] = useState("");
	const [error, setError] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [name, setName] = useState("");
	const [attendance, setAttendance] = useState(-1);
	const [token, setToken] = useState(localStorage.getItem('token') || "");

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				test,
				setTest,
				error,
				setError,
				name,
				setName,
				attendance,
				setAttendance,
				token,
				setToken,
				isMenuOpen,
				setIsMenuOpen
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
