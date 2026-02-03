import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-(--bg) text-(--text)">
      <h1 className="text-8xl font-extrabold text-(--danger)">404</h1>

      <h2 className="mt-4 text-3xl font-semibold text-(--text)">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-(--text-secondary)">
        Looks like you took a wrong turn 🚗💨 The page you’re trying to reach
        doesn’t exist.
      </p>

      <div className="mt-8 flex gap-4">
        <Button
          label="Go to Home"
          onClick={() => navigate("/")}
          buttonTheme="primary"
          textTheme="light"
        />
      </div>
    </div>
  );
};

export default NotFound;
