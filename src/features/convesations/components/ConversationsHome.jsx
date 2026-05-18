import { useEffect } from "react";

import { ConversationsSidebar } from "../components/ConversationsSidebar";
import { ChatWindow } from "../components/ChatWindow";

import { useConversationStore } from "../../../features/users/Store/adminStore";

export const ConversationsHome = () => {

    const {
        conversations,
        selectedConversation,
        setSelectedConversation,
        getConversations
    } = useConversationStore();

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <div className="h-[calc(100vh-120px)] flex gap-6">

            <ConversationsSidebar
                conversations={conversations}
                selectedConversation={selectedConversation}
                setSelectedConversation={setSelectedConversation}
            />

            <ChatWindow
                conversation={selectedConversation}
                messages={[]}
            />

        </div>
    );
};