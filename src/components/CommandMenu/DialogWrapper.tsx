"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { CommandDialog } from "@/components/ui/command";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Command } from "lucide-react";

const DialogContext = createContext({ closeDialog: () => {} });

export default function DialogWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const closeDialog = () => setOpen(false);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(open => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => {
			document.removeEventListener("keydown", down);
		};
	}, []);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	let isMac = false;
	if (navigator)
		isMac = navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;

	return (
		<>
			<p className="fixed bottom-0 hidden w-screen border-t border-border bg-secondary py-0.5 text-center text-sm text-muted-foreground lg:block">
				Press{" "}
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					{isMac ? (
						<>
							<span className="text-xs">⌘</span>J
						</>
					) : (
						<>
							<span className="text-xs">Ctrl</span>+J
						</>
					)}
				</kbd>
			</p>
			<Button
				size="icon"
				variant="outline"
				className="fixed bottom-4 right-4 z-10 lg:hidden"
				onClick={() => setOpen(true)}
			>
				<Command size={16} />
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<DialogContext.Provider value={{ closeDialog }}>
					{children}
				</DialogContext.Provider>
			</CommandDialog>
		</>
	);
}

export function useDialog() {
	return useContext(DialogContext);
}
