import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all session data
    sessionStorage.clear();

    // If you still have any old data in localStorage,
    // remove it as well (optional)
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminId");
    localStorage.removeItem("username");

    // Redirect to login page
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <p className="text-lg font-medium">Logging out...</p>
    </div>
  );
};

export default Logout;