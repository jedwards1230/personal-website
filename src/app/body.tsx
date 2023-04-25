"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

import useWindowSize from "@/lib/windowSize";
import { EmailIcon, GithubIcon, LinkedInIcon } from "@/components/icons";
import Game from "@/components/gameComponent";
import Chat from "@/components/chat";

const links = [
	{
		href: "//www.github.com/jedwards1230",
		icon: <GithubIcon width={30} height={30} />,
	},
	{
		href: "//www.linkedin.com/in/justinedwards1230",
		icon: <LinkedInIcon width={30} height={30} />,
	},
	{
		href: "mailto:justinedwards1230@gmail.com",
		icon: <EmailIcon width={30} height={30} />,
	},
];

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
			<Suspense>
				<Game key={idx} />
			</Suspense>
			<div className="overflow-y-scroll h-screen w-screen flex flex-col justify-center items-center text-center relative">
				<Link
					href="/"
					passHref
					className="text-black text-7xl font-medium pb-4 my-0 mx-4 text-center underline decoration-black/50 hover:decoration-black/100 dark:text-white dark:decoration-white/50 dark:hover:decoration-white/100"
					onClick={reset}
				>
					Justin Edwards
				</Link>
				<Chat />
				<IconLinks />
			</div>
		</>
	);
}

function IconLinks() {
	return (
		<div className="fill-black dark:fill-white flex justify-between w-48 mt-2">
			{links.map((link, i) => (
				<a
					key={i}
					className="transition ease-in-out duration-200 transform hover:scale-125"
					href={link.href}
					target="_blank"
					rel="noreferrer"
				>
					{link.icon}
				</a>
			))}
		</div>
	);
}
