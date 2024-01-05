import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";

export const MenuButton = ({ children }: { children: React.ReactNode }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" className="lg:hidden" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent>{children}</SheetContent>
		</Sheet>
	);
};

export default MenuButton;
