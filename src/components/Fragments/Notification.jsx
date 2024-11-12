const Notification = ({ message, description, type, onClose }) => {
  return (
    <div
      role="alert"
      className={`rounded-xl border p-4 max-w-xl mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        type === "success"
          ? "border-green-100 bg-green-50 text-green-600"
          : "border-red-100 bg-red-50 text-red-600"
      }`}
    >
      <div className="flex items-start gap-4">
        <span>
          {type === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </span>
        <div className="flex-1">
          <strong className="block font-medium">{message}</strong>
          <p className="mt-1 text-sm">{description}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 transition hover:text-gray-600"
        >
          <span className="sr-only">Dismiss</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
