import { useChatStore } from "../hooks/useChat";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../hooks/authUser";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => {
          const isAuthUser = message.senderId === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex items-start ${
                isAuthUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isAuthUser && (
                <div className="avatar w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={
                      selectedUser.profilePic ||
                      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                    }
                    alt="profile pic"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div
                className={`max-w-[70%] p-4 rounded-lg shadow-md ${
                  isAuthUser
                    ? "bg-blue-600 text-white text-right"
                    : "bg-gray-800 text-gray-200 text-left"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="w-full max-h-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p className="mx-4">{message.text}</p>}
                <time className="block text-xs opacity-50 mt-2">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              {isAuthUser && (
                <div className="avatar w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={
                      authUser.profilePic ||
                      "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                    }
                    alt="profile pic"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messageEndRef}></div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
