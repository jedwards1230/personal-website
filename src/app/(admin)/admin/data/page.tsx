import { getAllData } from "@/models/data.server";
import Download from "./DownloadButton";
import Upload from "./UploadButton";
import Editor from "./Editor";
import RevalidateButton from "./RevalidateButton";

export default async function Page() {
	const data = await getAllData();

	const dataString = JSON.stringify(data, null, 4);

	return (
		<div className="col-span-12 flex h-full flex-col gap-4 overflow-hidden p-4 lg:col-span-10">
			<div className="flex justify-between gap-2">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-semibold capitalize">Data</h2>
					<p className="text-sm text-secondary-foreground">
						Edit ALL the data on the website.
					</p>
					<p className="text-sm font-medium text-destructive">
						This is risky. Make sure you know what you&apos;re
						doing.
					</p>
				</div>
				<div className="flex w-96 items-start justify-between gap-2">
					<Download />
					<Upload />
					<RevalidateButton />
				</div>
			</div>
			<div className="h-full overflow-y-scroll">
				<Editor data={dataString} />
				{/* <pre>{dataString}</pre> */}
			</div>
		</div>
	);
}
