import clsx from "clsx";
import { Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAllMessages } from "@/models/contact.server";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const title = "Messages";
	const path = "/admin/messages";

	const data = await getAllMessages();

	return (
		<>
			<div className="col-span-3 flex flex-col border-r border-border">
				<div className="flex items-center justify-between border-b border-border p-2 pl-4">
					<h2 className="text-lg font-bold">{title}</h2>
					<form method="post">
						<Button variant="outline" size="icon">
							<Plus />
						</Button>
					</form>
				</div>
				{data.map((d: any) => (
					<div key={d.id}>
						<Link
							href={`${path}/${d.id}`}
							className={clsx(
								false
									? "bg-foreground text-background hover:bg-foreground/70"
									: "hover:bg-secondary focus:bg-foreground/30",
								"block w-full cursor-pointer py-2 pl-4 capitalize transition-all duration-100"
							)}
						>
							{d.name}
						</Link>
					</div>
				))}
			</div>
			{children}
		</>
	);
}
