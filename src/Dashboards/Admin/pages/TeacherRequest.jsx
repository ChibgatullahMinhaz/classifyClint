// TeacherRequest.jsx
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const TeacherRequest = () => {
  const { data = [], refetch } = useQuery({
    queryKey: ['teacherRequests'],
    queryFn: async () => (await axios.get('/api/admin/teacher-requests')).data,
  });

  const updateStatus = async ({ id, status }) => {
    await axios.patch(`/api/admin/teacher-requests/${id}`, { status });
    refetch();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Teacher Requests</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Experience</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((req) => (
            <tr key={req._id}>
              <td>{req.name}</td>
              <td><img src={req.image} alt="img" className="w-12 h-12 rounded" /></td>
              <td>{req.experience}</td>
              <td>{req.title}</td>
              <td>{req.category}</td>
              <td>{req.status}</td>
              <td className="space-x-2">
                <button
                  onClick={() => updateStatus({ id: req._id, status: 'accepted' })}
                  disabled={req.status === 'rejected'}
                  className="btn btn-success btn-sm"
                >Approve</button>
                <button
                  onClick={() => updateStatus({ id: req._id, status: 'rejected' })}
                  disabled={req.status === 'rejected'}
                  className="btn btn-error btn-sm"
                >Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherRequest;