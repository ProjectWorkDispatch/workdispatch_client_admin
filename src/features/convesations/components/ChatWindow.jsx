import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export const ChatWindow = ({
    conversation,
    messages
}) => {

    if (!conversation) {
        return (
            <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-center text-gray-400">
                Selecciona una conversación
            </div>
        );
    }

    const user = conversation.user1Id;

    const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`;

    return (
        <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">

            <header className="px-6 py-5 border-b border-gray-100 flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {fullName
                        .split(" ")
                        .map((word) => word[0])
                        .slice(0, 2)
                        .join("")}
                </div>

                <div>

                    <h2 className="font-bold text-[#0F172A]">
                        {fullName}
                    </h2>

                    <p className="text-sm text-gray-400">
                        {user?.email}
                    </p>

                </div>

            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gray-50">
                {messages.map((message) => (
                    <MessageBubble
                        key={message._id}
                        message={message}
                    />
                ))}
            </div>

            <MessageInput />

        </div>
    );
};