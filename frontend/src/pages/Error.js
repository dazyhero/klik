import { useLocation } from "react-router-dom";

const Error = ({ message = "Page not found" }) => {
  const { state } = useLocation();
  if (state && state.message) {
    message = state.message;
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-red-500 text-xl italic">{message}</p>
    </div>
  );
};

export default Error;
