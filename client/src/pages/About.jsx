import React from "react";
import Navbar from "../components/Navbar"; // Adjust the import path as needed

const About = () => {
	return (
		<div className='flex flex-col min-h-screen bg-gray-100'>
			<Navbar />
			<main className='flex-grow container mx-auto px-4 py-8'>
				<div className='bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto'>
					<h1 className='text-2xl font-bold text-indigo-600 mb-4'>
						About Simplifii Simplified
					</h1>
					<p className='text-gray-700 mb-4'>
						Simplifii Simplified was built to streamline the process of fetching
						attendance from the ABES Simplifii portal. With just one click,
						users can access their attendance information without the need for
						repeated logins.
					</p>
					<p className='text-gray-700 mb-4'>
						This app aims to save time and reduce frustration for students who
						need to check their attendance regularly.
					</p>
					<div className='mt-6'>
						<h2 className='text-2xl font-bold text-indigo-600 mb-2'>
							Developer
						</h2>
						<p className='text-gray-700 mb-1'>
							<strong>Name:</strong>{" "}
							<span
								className='border-b-2 border-dashed cursor-pointer border-black'
								onClick={() =>
									window.open("https://www.linkedin.com/in/manisangh/")
								}
							>
								Manisangh Sharma
							</span>
						</p>
						<p className='text-gray-700'>
							<strong>Academic Details:</strong> 3rd Year, IT Branch
						</p>
						<p className='text-gray-700'>
							<strong>Institution:</strong> ABES Engineering College
						</p>
					</div>
				</div>
			</main>
			<footer className='text-gray-600 font-medium py-2 text-center'>
				<p>
					&copy; {new Date().getFullYear()} Simplifii Simplified. All rights
					reserved.
				</p>
			</footer>
		</div>
	);
};

export default About;
