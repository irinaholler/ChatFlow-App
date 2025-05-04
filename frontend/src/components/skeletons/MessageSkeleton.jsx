const MessageSkeleton = () => {
	return (
		<>
			{/* left‐aligned message */}
			<div className='flex gap-4 items-center mb-4'>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				<div className='flex flex-col gap-2'>
					<div className='skeleton h-6 w-64 rounded-lg'></div>
					<div className='skeleton h-6 w-48 rounded-lg'></div>
				</div>
			</div>

			{/* right‐aligned message */}
			<div className='flex gap-4 items-center justify-end mt-4'>
				<div className='flex flex-col gap-2'>
					<div className='skeleton h-6 w-60 rounded-lg'></div>
				</div>
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
export default MessageSkeleton;
