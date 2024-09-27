import { useState } from 'react'
import axios from 'axios'
import Attendance from './components/Attendance'
import Cookies from 'js-cookie'
import { RefreshCw } from 'lucide-react'
import Test from './components/Test'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState("")
  const [test, setTest] = useState("")
  const [error, setError] = useState("")
  const [pass, setPass] = useState("")
  const [name, setName] = useState("")
  const [roll, setRoll] = useState("")
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
			setName(response.data.response.name);
			setRoll(response.data.response.string4);
			
      Cookies.set("jwt", response.data.token, {
      expires: 100,
    })
    setError("")
		} catch (err) {
			console.log(err.message);
      setError("Wrong Credentials!")
		} finally {
			setLoading(false);
		}
	};
  return (
		<>
			{!token && (
				<>
					<h1 className='p-5 text-[32px] font-semibold text-center'>
						Simplifii Simplified
					</h1>
					<div className='text-xl w-full flex justify-center mt-9'>
						<div className='flex flex-col justify-center items-center gap-6 p-5 border-2 border-black rounded-md'>
							<p className='font-medium'>Login to ABES Simplifii!</p>
							<input
								type='text'
								id='user'
								value={user}
								className='border-black border-2 rounded-md px-3 py-1 max-w-[250px]'
								onChange={(e) => setUser(e.target.value)}
							/>
							<input
								type='password'
								id='pass'
								value={pass}
								className='border-black border-2 rounded-md px-3 py-1 max-w-[250px]'
								onChange={(e) => setPass(e.target.value)}
							/>
							<button
								onClick={handleLogin}
								className='border-black border-2 rounded-md px-3 py-1 '
							>
								{loading ? (
									<RefreshCw
										size={28}
										className={`${loading && "animate-spin"}`}
									/>
								) : (
									"Submit"
								)}
							</button>
						</div>
					</div>
				</>
			)}

			{error && (
				<p className='text-red-500 text-lg font-medium text-center mt-3'>
					{error}
				</p>
			)}

			{token && (
				<Attendance
					token={token}
					setUser={setUser}
					setPass={setPass}
					setToken={setToken}
					attendanceApiUrl={attendanceApiUrl}
					attendance={attendance}
					setAttendance={setAttendance}
					name = {name}
					roll = {roll}
				/>
			)}
			<Test token={token} test={test} />
			<Footer />
		</>
	);
}

export default App
