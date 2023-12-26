export default function SectionTitle({ id }: { id: string }) {
	return (
		<div className="text-xl font-medium md:text-center md:text-2xl">
			{id.charAt(0).toUpperCase() + id.slice(1)}
		</div>
	);
}
