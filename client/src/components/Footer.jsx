import { Heart } from "lucide-react";

const Footer = () => {
  return (
		<>
			<p className='flex justify-center items-center absolute right-0 left-0 m-auto text-md bottom-3 gap-1 text-gray-600 '>
				Made with <Heart fill='red' strokeWidth={0} size={17} /> by{" "}
				<a
					href='https://www.linkedin.com/in/manisangh/'
					target='_blank'
					className='text-black font-medium'
				>
					Manisangh
				</a>
			</p>
		</>
	);
}
export default Footer