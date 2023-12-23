import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
	// Redirect to the PDF file
	return redirect("/Justin Edwards - Resume.pdf");
};
