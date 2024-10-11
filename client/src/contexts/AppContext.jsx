import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

// Create the context
export const AppContext = createContext();

// Create the provider component
export const AppProvider = ({ children }) => {
	const [user, setUser] = useState(Cookies.get('ssroll') || "")  ;
	const [test, setTest] = useState("");
	const [error, setError] = useState("");
	const [name, setName] = useState(Cookies.get("ssname") || "");
	const [attendance, setAttendance] = useState(-1);
	const [token, setToken] = useState(Cookies.get("ssjwt") || "");

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
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
