import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosSecure from "../../../Service/AxiosSecure";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import Swal from "sweetalert2";

const TeacherRequest = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-requests`);
      return res.data;
    },
  });

  const acceptMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch(`/teacher-requests/approve/${id}`, {
        status: "approved",
      }),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Approved!",
        text: "Teacher request has been approved.",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error?.response?.data?.error || "Something went wrong.",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) =>
      axiosSecure.patch(`/teacher-requests/reject/${id}`, {
        status: "rejected",
      }),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Rejected!",
        text: "Teacher request has been rejected.",
        timer: 2000,
        showConfirmButton: false,
      });
      refetch();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: error?.response?.data?.error || "Something went wrong.",
      });
    },
  });

  const confirmAndAccept = (teacher) => {
    Swal.fire({
      title: `Approve ${teacher.name}?`,
      text: "This will approve the teacher request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        acceptMutation.mutate(teacher._id);
      }
    });
  };

  const confirmAndReject = (teacher) => {
    Swal.fire({
      title: `Reject ${teacher.name}?`,
      text: "This will reject the teacher request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(teacher._id);
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Teacher Requests</h2>

      {data.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-10">
          🚫 No teacher requests at the moment.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full min-w-[600px]">
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
                  <td>
                    <img
                      src={req.image}
                      alt="img"
                      className="w-12 h-12 rounded"
                    />
                  </td>
                  <td>{req.experience}</td>
                  <td>{req.title}</td>
                  <td>{req.category}</td>
                  <td>{req.status}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => confirmAndAccept(req)}
                      disabled={
                        req.status !== "pending" || acceptMutation.isLoading
                      }
                      className="btn btn-success btn-sm"
                    >
                      {acceptMutation.isLoading ? "Approving..." : "Approve"}
                    </button>
                    <button
                      onClick={() => confirmAndReject(req)}
                      disabled={
                        req.status === "rejected" || rejectMutation.isLoading
                      }
                      className="btn btn-error btn-sm"
                    >
                      {rejectMutation.isLoading ? "Rejecting..." : "Reject"}
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

export default TeacherRequest;
