import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import MainLayout from "../layouts/MainLayout";
import AdminRoutes from "../AdminRoutes";
import ScrollToHash from "../admin/components/ScrollToHash";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <MainLayout>
          <ScrollToHash/>
          <Home />
        </MainLayout>
      } />
      <Route path="/register" element={<Registration />} />
      
      {/* Admin Routes */}
      <Route path="/dashboard/*" element={<AdminRoutes />} />
      <Route path="/admin/*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
