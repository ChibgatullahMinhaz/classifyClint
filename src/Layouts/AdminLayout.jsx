import React from 'react';
import { Outlet } from 'react-router';
import AdminDashboard from '../Dashboards/Admin/AdminDashboard';

const AdminLayout = () => {
    return (
        <>
            <AdminDashboard />
        </>
    );
};

export default AdminLayout;