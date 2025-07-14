import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const Users = () => {
  const [search, setSearch] = useState('');
  const { data = [], refetch } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => (await axios.get(`/api/admin/users?search=${search}`)).data,
  });

  const makeAdmin = async (id) => {
    await axios.patch(`/api/admin/users/${id}`, { role: 'admin' });
    refetch();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered"
        />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><img src={user.image} alt="user" className="w-12 h-12 rounded-full" /></td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => makeAdmin(user._id)}
                  disabled={user.role === 'admin'}
                >Make Admin</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;