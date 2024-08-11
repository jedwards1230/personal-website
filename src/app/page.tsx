export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 text-center sm:p-12 md:p-24">
			<p className="text-4xl transition-all md:text-5xl">
				Justin Edwards
			</p>
			<p className="text-xl font-semibold transition-all md:text-2xl">
				Site Reliability Engineer
			</p>
			<p className="text-neutral-400 transition-colors hover:text-blue-400">
				<a href="mailto:justin@jedwards.cc">justin@jedwards.cc</a>
			</p>
		</main>
	);
}
