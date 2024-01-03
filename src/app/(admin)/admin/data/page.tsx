import { getAllData } from "@/models/data.server";
import Download from "./Download";
import Upload from "./Upload";
import Editor from "./Editor";
import RevalidateButton from "./Revalidate";

export default async function Page() {
	const data = await getAllData();

	const dataString = JSON.stringify(data, null, 4);

	return (
		<div className="flex col-span-12 overflow-hidden gap-4 lg:col-span-10 h-full p-4 flex-col">
			<div className="flex gap-2 justify-between">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl capitalize font-semibold">Data</h2>
					<p className="text-sm text-secondary-foreground">
						Edit ALL the data on the website.
					</p>
					<p className="text-sm font-medium text-destructive">
						This is risky. Make sure you know what you&apos;re
						doing.
					</p>
				</div>
				<div className="flex w-96 justify-between items-start gap-2">
					<Download />
					<Upload />
					<RevalidateButton />
				</div>
			</div>
			<div className="overflow-y-scroll h-full">
				<Editor data={dataString} />
				{/* <pre>{dataString}</pre> */}
			</div>
		</div>
	);
}
