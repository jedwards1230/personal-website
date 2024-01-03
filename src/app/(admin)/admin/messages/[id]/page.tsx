import EditButton from "@/components/buttons/EditButton";
import { readContact } from "@/models/contact.server";

export default async function Page({ params }: { params: { id: number } }) {
	const message = await readContact(Number(params.id));

	if (!message) {
		return <div>Not found</div>;
	}
	return (
		<div className="w-full relative p-4 overflow-y-scroll col-span-9 lg:col-span-7">
			{!true && (
				<div className="absolute top-4 right-4">
					<EditButton isEdit={false} />
				</div>
			)}
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
