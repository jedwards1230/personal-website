import { readContact } from "@/models/contact.server";
import DeleteButton from "./DeleteButton";

export const runtime = "edge";

export default async function Page({ params }: { params: { id: string } }) {
	const message = await readContact(Number(params.id));

	if (!message) {
		return <div>Not found</div>;
	}
	return (
		<div className="relative col-span-9 w-full overflow-y-scroll p-4 lg:col-span-7">
			<div className="absolute right-4 top-4">
				<DeleteButton id={Number(params.id)} />
			</div>
			<div className="space-y-2">
				<div className="space-y-1">
					<div className="font-bold">Name</div>
					<div>{message.name}</div>
				</div>
				<div className="space-y-1">
					<div className="font-bold">Email</div>
					<div>{message.email}</div>
				</div>
				<div className="space-y-1">
					<div className="font-bold">Date</div>
					<div>{message.createdAt.toLocaleString()}</div>
				</div>
				<div className="space-y-1">
					<div className="font-bold">Message</div>
					<div>{message.message}</div>
				</div>
			</div>
		</div>
	);
}
