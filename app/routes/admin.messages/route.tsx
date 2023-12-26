import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { requireAdminSession } from "@/session.server";
import { getAllMessages } from "@/models/contact.server";

export const loader: LoaderFunction = async ({ request }) => {
	try {
		await requireAdminSession(request);
		return json(await getAllMessages());
	} catch (error) {
		return error;
	}
};

export default function Messages() {
	const messages = useLoaderData<typeof loader>() as Contact[];

	return (
		<div className="col-span-12 lg:col-span-10">
			<table className="table-auto w-full">
				<thead>
					<tr>
						<th className="px-4 py-2">Name</th>
						<th className="px-4 py-2">Email</th>
						<th className="px-4 py-2">Message</th>
					</tr>
				</thead>
				<tbody>
					{messages.map(m => {
						return (
							<tr key={m.id}>
								<td className="border px-4 py-2">{m.name}</td>
								<td className="border px-4 py-2">{m.email}</td>
								<td className="border px-4 py-2">
									{m.message}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
