import { Button } from '../ui/button';
import { ChatBubble } from '../Icons';
import { getSession } from '@/lib/auth';

export const ChatButton = async () => {
    const session = await getSession();
    if (!session) return null;

    return (
        <Button variant="outline" size="icon">
            <ChatBubble />
        </Button>
    );
};
