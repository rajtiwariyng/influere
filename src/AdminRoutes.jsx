import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminApp from './admin/AdminApp';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminApp />} />
    </Routes>
  );
};

export default AdminRoutes;
