import Login from './pages/Login'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import { AppContext } from './contexts/AppContext';
import { useContext } from 'react';
import About from './pages/About';

function App() {
const {token} = useContext(AppContext)
const router = createBrowserRouter([
	{
		path: "/",
		element: token ? <Navigate to='/dashboard' /> : <Navigate to='/login' />,
	},
	{
		path: "/login",
		element: token ? <Navigate to='/dashboard' /> : <Login />,
	},

	{
		path: "/dashboard",
		element: token ? <Dashboard /> : <Navigate to='/login' />,
	},
	{
		path: "/about",
		element: token ? <About /> : <Navigate to='/login' />,
	},
]);

  return (
		<>
			<RouterProvider router={router}/>
		</>
	);
}

export default App
