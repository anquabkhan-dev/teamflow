import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div>
      <nav>
        <NavLink to="/app/dashboard">DashBoard</NavLink>
        <br />
        <NavLink to="/app/profile">Profile</NavLink>
        <br />
        <NavLink to="/app/projects">Projects</NavLink>
        <br />
        {user?.role === "admin" && (
          <>
            <NavLink to="/app/settings">Settings</NavLink>
            <br />
          </>
        )}{" "}
      </nav>
    </div>
  );
};

export default Sidebar;
