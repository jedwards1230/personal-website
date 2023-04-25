import NoSsr from "scripts/noSsr";
import Body from "./body";

export const metadata = {
	title: "J. Edwards",
	description: "Personal website for Justin Edwards",
};

export default function Page() {
	return (
		<NoSsr>
			<Body />
		</NoSsr>
	);
}
