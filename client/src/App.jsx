import { useState } from 'react'
import axios from 'axios'
import Attendance from './components/Attendance'
import Cookies from 'js-cookie'

function App() {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [attendance, setAttendance] = useState(-1)
  const [token, setToken] = useState(
		Cookies.get("jwt") || ""
	);
  const [loading, setLoading] = useState(false)
  const loginApiUrl =
		"https://abes.platform.simplifii.com/api/v1/admin/authenticate";

  const attendanceApiUrl =
		"https://abes.platform.simplifii.com/api/v1/custom/getCFMappedWithStudentID?embed_attendance_summary=1";


  const handleLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.postForm(
				loginApiUrl,{
          username: user,
          password: pass
        });
			setToken(response.data.token);
      Cookies.set("jwt", response.data.token, {
      expires: 60,
    })
    setToken
      
		} catch (err) {
			console.log(err.message);
		} finally {
			setLoading(false);
		}
	};
  return (
		<>
			{!token && (
				<div className='text-xl w-full flex justify-center mt-10'>
					<div className='flex flex-col justify-center items-center gap-5 p-4 border-2 border-black size-fit rounded-md'>
						<p>Login to ABES Simplifii!</p>
						<input
							type='text'
							id='user'
							value={user}
							className='border-black border-2 rounded-md px-3 py-1'
							onChange={(e) => setUser(e.target.value)}
						/>
						<input
							type='password'
							id='pass'
							value={pass}
							className='border-black border-2 rounded-md px-3 py-1'
							onChange={(e) => setPass(e.target.value)}
						/>
						<button
							onClick={handleLogin}
							className='border-black border-2 rounded-md px-3 py-1'
						>
							Submit
						</button>
					</div>
				</div>
			)}

			{token && (
				<Attendance
					token={token}
          setUser = {setUser}
          setPass = {setPass}
          setToken = {setToken}
					attendanceApiUrl={attendanceApiUrl}
					attendance={attendance}
					setAttendance={setAttendance}
				/>
			)}
		</>
	);
}

export default App
