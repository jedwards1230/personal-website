import { readContact } from "@/models/contact.server";
import DeleteButton from "./DeleteButton";

export const runtime = "edge";

export default async function Page({ params }: { params: { id: string } }) {
	const message = await readContact(Number(params.id));

	if (!message) {
		return <div>Not found</div>;
	}
	return (
		<div className="w-full relative p-4 overflow-y-scroll col-span-9 lg:col-span-7">
			<div className="absolute top-4 right-4">
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
