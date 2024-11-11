export const Button = ({ children, handerAction, disabled }) => {
  return (
    <div>
      <button
        onClick={handerAction}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          disabled
            ? "bg-gray-400 hover:bg-gray-400 text-white cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
