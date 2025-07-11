import React from 'react';
import { Outlet } from 'react-router';
import TeacherDashboard from '../Dashboards/Teacher/TeacherDashboard';

const TeacherLayout = () => {
    return (
        <>
            <TeacherDashboard />
        </>
    );
};

export default TeacherLayout;