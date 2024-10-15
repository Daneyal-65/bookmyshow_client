// Card components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white shadow-md rounded-lg border border-blue-400 ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-4 py-5 border-b border-gray-200 sm:px-6 ${className}`}>
    <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-4 py-5 sm:p-6 ${className}`}>{children}</div>
);

// Button component
const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseStyle =
    "px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    destructive: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Input component
const Input = ({ type = "text", className = "", ...props }) => (
  <input
    type={type}
    className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
    {...props}
  />
);

export { Card, CardContent, CardHeader, Button, Input };
