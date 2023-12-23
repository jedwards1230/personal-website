export const Section = ({
	children,
	title,
	addButtonDialog,
}: {
	children: React.ReactNode;
	title: string;
	addButtonDialog?: React.ReactNode;
}) => (
	<div className="w-full rounded border border-border p-2 transition-all">
		<div className="flex w-full justify-between">
			<Title>{title}</Title>
			{addButtonDialog && (
				<div className="flex justify-end">{addButtonDialog}</div>
			)}
		</div>
		<List>{children}</List>
	</div>
);

export const Title = ({ children }: { children: React.ReactNode }) => (
	<div className="p-2 text-lg font-bold">{children}</div>
);

export const List = ({ children }: { children: React.ReactNode }) => (
	<div className="w-full py-1">{children}</div>
);

export const ListItem = ({
	children,
	...props
}: {
	children: React.ReactNode;
	props?: React.HTMLAttributes<HTMLDivElement>;
}) => (
	<div
		className="w-full cursor-pointer rounded-lg px-2 py-1 underline-offset-4 hover:bg-secondary/60 hover:underline"
		{...props}
	>
		{children}
	</div>
);
