"use client";

import { PDFViewer } from "@react-pdf/renderer";

import { PDFData, PdfDocument } from "./pdf";

// Create Document Component
export default function MyPdf({ data }: { data: PDFData }) {
	return (
		<PDFViewer className="h-full w-full">
			<PdfDocument data={data} />
		</PDFViewer>
	);
}
