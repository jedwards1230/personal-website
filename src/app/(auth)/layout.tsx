export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full flex flex-col h-full gap-4 items-center justify-center">
			{children}
		</div>
	);
}
