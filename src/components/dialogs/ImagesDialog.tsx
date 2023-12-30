import ImageCard from "@/components/cards/ImageCard";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function ImagesDialog({
	project,
	children,
}: {
	project: Project;
	children: React.ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild className="object-cover">
				{children}
			</DialogTrigger>
			<DialogContent size="full">
				<ImageCard project={project} />
			</DialogContent>
		</Dialog>
	);
}
