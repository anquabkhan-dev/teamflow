import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Projects from "../pages/Projects/Projects";
import Settings from "../pages/Settings/Settings";
import ProjectDetails from "../pages/ProjectDetails/ProjectDetails";
import AppLayouts from "../layouts/AppLayouts";
import ProtectedRoute from "../auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute allowedRoles={["developer", "manager", "admin"]} />
        }
      >
        <Route path="app" element={<AppLayouts />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />
          //allowed routes for users
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
