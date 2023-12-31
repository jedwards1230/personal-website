import React from "react";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// The 'theme' object is your Tailwind theme config
const tw = createTw({
	theme: {
		extend: {},
	},
});

const styles = StyleSheet.create({
	header: {
		fontWeight: "bold",
		fontSize: "12px",
	},
});

export type PDFData = {
	about: About;
	projects: Project[];
	experiences: Experience[];
};

export function PdfDocument({ data }: { data: PDFData }) {
	const { about, projects, experiences } = data;
	return (
		<Document>
			<Page size="A4" style={tw("flex flex-row text-[9px] bg-[#E4E4E4]")}>
				<View style={tw("w-1/3 flex flex-col gap-2 p-3 m-3")}>
					<Text style={tw("text-[24px]")}>{about.name}</Text>
					<Text style={tw("text-[11px]")}>{about.title}</Text>
					<View>
						<Text style={styles.header}>Details</Text>
						<Text>{about.location}</Text>
						<Text>{about.email}</Text>
					</View>
					<View>
						<Text style={styles.header}>Links</Text>
						<Text>Portfolio Link</Text>
						<Text>Github Link</Text>
						<Text>Linkedin Link</Text>
					</View>
					<View>
						<Text style={styles.header}>Skills</Text>
						{about.tags.map(tag => (
							<Text key={tag}>{tag}</Text>
						))}
					</View>
				</View>
				<View style={tw("flex-1 h-full flex flex-col gap-2 p-3 m-3")}>
					<View>
						<Text style={styles.header}>About</Text>
						<Text>{about.description}</Text>
					</View>
					<View style={tw("flex gap-1")}>
						<Text style={styles.header}>Employment History</Text>
						<View style={tw("flex gap-2")}>
							{experiences.map(experience => (
								<View
									key={experience.id}
									style={tw("flex gap-0.5")}
								>
									<View
										style={tw(
											"flex text-[10px] font-semibold flex-row"
										)}
									>
										<Text>
											{experience.company}
											{" - "}
										</Text>
										<Text>{experience.title}</Text>
									</View>
									<Text style={tw("uppercase text-[8px]")}>
										{experience.period}
									</Text>
									<View style={tw("pl-2")}>
										{experience.description.map(item => (
											<Text key={item}>{item}</Text>
										))}
									</View>
								</View>
							))}
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
}
