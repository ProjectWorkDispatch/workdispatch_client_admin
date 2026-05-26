export const MessageBubble = ({ message, adminId }) => {
    const isMine = message.senderId?._id === adminId || message.senderId === adminId;

    const time = message.createdAt
        ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "";

    return (
        <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-md px-4 py-3 rounded-2xl text-sm shadow-sm ${
                isMine
                    ? "bg-green-500 text-white rounded-br-md"
                    : "bg-white text-gray-700 rounded-bl-md border border-gray-100"
            }`}>
                <p className="leading-relaxed">{message.content}</p>
                <span className={`block mt-2 text-[11px] ${isMine ? "text-green-100" : "text-gray-400"}`}>
                    {time}
                </span>
            </div>
        </div>
    );
};