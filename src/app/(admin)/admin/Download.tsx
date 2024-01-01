"use client";

import { Button } from "@/components/ui/button";
import { getAbout } from "@/models/about.server";
import { getAllMessages } from "@/models/contact.server";
import { getAllExperiences } from "@/models/experience.server";
import { getAllProjects } from "@/models/project.server";

export default function Download() {
	const getData = async () => {
		const [about, projects, experience, messages] = await Promise.all([
			await getAbout(),
			await getAllProjects(),
			await getAllExperiences(),
			await getAllMessages(),
		]);
		return { about, projects, experience, messages };
	};

	const saveData = async () => {
		const allData = await getData();
		const dataStr =
			"data:text/json;charset=utf-8," +
			encodeURIComponent(JSON.stringify(allData, null, 2));
		const downloadAnchorNode = document.createElement("a");
		downloadAnchorNode.setAttribute("href", dataStr);
		downloadAnchorNode.setAttribute("download", "data.json");
		document.body.appendChild(downloadAnchorNode); // required for firefox
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	};

	return (
		<Button variant="link" onClick={saveData}>
			Download Data
		</Button>
	);
}
