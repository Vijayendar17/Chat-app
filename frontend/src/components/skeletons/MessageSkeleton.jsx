const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          } items-start space-x-3`}
        >
          {/* Skeleton for Profile Image (Shown for non-auth user messages only) */}
          {idx % 2 === 0 && (
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-gray-700 skeleton" />
            </div>
          )}

          {/* Skeleton for Message Content */}
          <div className="space-y-2">
            {/* Skeleton for Message Header (e.g., Time) */}
            <div className="h-4 w-16 bg-gray-700 skeleton rounded-md" />
            {/* Skeleton for Message Bubble */}
            <div className="h-12 w-48 bg-gray-700 skeleton rounded-lg" />
          </div>

          {/* Skeleton for Auth User's Profile Image */}
          {idx % 2 !== 0 && (
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-gray-700 skeleton" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
