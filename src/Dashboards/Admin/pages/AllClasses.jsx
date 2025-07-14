
// AllClasses.jsx
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AdminAllClasses = () => {
  const navigate = useNavigate();
  const { data = [], refetch } = useQuery({
    queryKey: ['all-classes'],
    queryFn: async () => (await axios.get('/api/admin/all-classes')).data,
  });

  const updateStatus = async ({ id, status }) => {
    await axios.patch(`/api/admin/all-classes/${id}`, { status });
    refetch();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Classes</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Posted By</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cls) => (
            <tr key={cls._id}>
              <td>{cls.title}</td>
              <td><img src={cls.image} alt="class" className="w-16 h-16 object-cover" /></td>
              <td>{cls.email}</td>
              <td>{cls.description.slice(0, 40)}...</td>
              <td>{cls.status}</td>
              <td className="space-x-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => updateStatus({ id: cls._id, status: 'accepted' })}
                  disabled={cls.status === 'accepted'}
                >Approve</button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => updateStatus({ id: cls._id, status: 'rejected' })}
                  disabled={cls.status === 'rejected'}
                >Reject</button>
              </td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => navigate(`/dashboard/class-progress/${cls._id}`)}
                  disabled={cls.status !== 'accepted'}
                >Progress</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAllClasses;