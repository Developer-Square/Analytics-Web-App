import React from 'react';

export default function DominoLoader({ loading }: { loading: boolean }) {
	return (
		<>
			{loading ? (
				<div className='relative'>
					<div className='loading-cover h-screen w-screen absolute bg-slate-50 z-10 opacity-80'></div>
					<div className='container-domino absolute z-20'>
						<div className='artboard'>
							<div className='domino'>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
