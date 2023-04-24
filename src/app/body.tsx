"use client";

import { useState, useEffect } from "react";

//import Game from "@/components/gameComponent";
import Intro from "@/components/intro";
import useWindowSize from "scripts/windowSize";

export default function Body() {
	const [idx, setIdx] = useState(0);
	const size = useWindowSize();

	// reset the game when the window size changes
	const reset = () => setIdx(idx + 1);

	useEffect(() => {
		reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [size]);

	return (
		<>
			{/* <Game key={idx} /> */}
			<div className="overflow-hidden snap-y h-screen w-screen">
				<div className="h-screen flex flex-col justify-center items-center text-center relative">
					<Intro reset={reset} />
				</div>
			</div>
		</>
	);
}
