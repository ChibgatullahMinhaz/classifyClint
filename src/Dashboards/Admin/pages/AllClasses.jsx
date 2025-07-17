import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axiosSecure from "../../../Service/AxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const AdminAllClasses = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch all classes
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/classes");
      return res.data;
    },
  });

  // Mutation to update status
  const acceptedMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/admin/classes/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-classes"] });
      Swal.fire("Success", "Class Accepted successfully!", "success");
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to update status.",
        "error"
      );
    },
  });
  const rejectedMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/admin/classes/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-classes"] });
      Swal.fire("Success", "Class Rejected successfully!", "success");
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to update status.",
        "error"
      );

    },
  });

  // Confirm and approve
  const handleAccept = (id) => {
    Swal.fire({
      title: `Are you sure to approve this class?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptedMutation.mutate(id);
      }
    });
  };

  // Confirm and reject
  const handleReject = (id) => {
    Swal.fire({
      title: `Are you sure to reject this class?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectedMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading classes</div>;

  if (data.length === 0) {
    return (
      <div className="text-center mt-20">
        <h3 className="text-3xl font-semibold text-gray-700">
          No Classes Found
        </h3>
        <p className="text-gray-500 mt-2">
          There are currently no classes to display.
        </p>
      </div>
    );
  }
 
    return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Classes</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full min-w-[700px] border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Posted By</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Progress</th>
            </tr>
          </thead>
          <tbody>
            {data.map((cls) => (
              <tr key={cls._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{cls.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={cls.image}
                    alt="class"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">{cls.email}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {cls.description.slice(0, 40)}...
                </td>
                <td className="border border-gray-300 px-4 py-2 capitalize">{cls.status}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2 whitespace-nowrap">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleAccept(cls._id)}
                    disabled={cls.status === "accepted" || acceptedMutation.isLoading}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleReject(cls._id)}
                    disabled={cls.status === "rejected" || rejectedMutation.isLoading}
                  >
                    Reject
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => navigate(`/admin-dashboard/class-progress/${cls._id}`)}
                    disabled={cls.status !== "accepted"}
                  >
                    Progress
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllClasses;
