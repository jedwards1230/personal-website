import { Link } from "@remix-run/react";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ modal = false }: { modal?: boolean }) {
	return modal ? (
		<div className="group col-span-4 flex cursor-pointer select-none items-center gap-2 pl-2 hover:underline">
			<span className="transition-all duration-150 group-hover:-translate-x-1">
				<ArrowLeft />
			</span>
			Back
		</div>
	) : (
		<Link
			to="/"
			className="col-span-4 flex items-center gap-2 pl-2 transition-all hover:gap-4 hover:underline"
		>
			<ArrowLeft />
			Home
		</Link>
	);
}
