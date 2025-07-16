import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import axiosSecure from "../../../Service/AxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/users?search=${search}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = Array.isArray(data) ? data : [];

  const { mutate: makeAdmin, isPending: isMakingAdmin } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/users/make-admin/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Success", "User has been made admin!", "success");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong.",
        "error"
      );
    },
  });

  // When clicking the button
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: `Make ${user.name} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin(user._id);
      }
    });
  };
  // if (isLoading) return <LoadingSpinner /> ;

  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        🚫 Failed to load users: {error?.message}
      </div>
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Users</h2>
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-64"
        />
      </div>

      {users.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          🔍 No users found matching your search.
        </div>
      ) : (
        <div className="overflow-x-auto relative">
          {/* Overlay spinner on table while fetching */}
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
              <LoadingSpinner />
            </div>
          )}
          <table className="table w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ opacity: isFetching ? 0.5 : 1 }}>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img
                      src={user.image}
                      alt="user"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => handleMakeAdmin(user)}
                      disabled={user.role === "admin" || isMakingAdmin}
                    >
                      {user.role === "admin"
                        ? "Admin"
                        : isMakingAdmin
                        ? "Processing..."
                        : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
