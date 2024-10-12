import { Heart } from "lucide-react";

const Footer = () => {
  return (
		<footer className='mb-2 text-center text-gray-600'>
			<p className='flex items-center justify-center gap-1'>
				Made with{" "}
				<Heart
					size={16}
					fill='#EC4899'
					color='#EC4899'
					className='animate-pulse'
				/>{" "}
				by{" "}
				<span
					className='font-bold cursor-pointer'
					onClick={() =>
						window.open("https://www.linkedin.com/in/manisangh/")
					}
				>
					Manisangh
				</span>
			</p>
		</footer>
	);
}
export default Footer