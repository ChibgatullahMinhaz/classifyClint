import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hook/useAuth";
import axiosSecure from "../../../Service/AxiosSecure";

const MyRequestPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get current teacher request
  const { data: request, isPending } = useQuery({
    queryKey: ["teacher-request", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/teacher-request?email=${user?.email}`
      );
      
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Retry mutation for rejected request
  const retryMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(
        `/api/teacher-request/retry/${user?.email}`
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Your request has been re-submitted.", "success");
      queryClient.invalidateQueries(["teacher-request"]);
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    },
  });

  if (isPending) {
    return <div className="text-center py-10">Loading your request...</div>;
  }

  if (!request) {
    return (
      <div className="text-center py-10">
        <p>You have not submitted any request yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        My Teacher Request
      </h2>

      <div className="space-y-4 text-gray-800">
        <div>
          <strong>Name:</strong> {request.name}
        </div>
        <div>
          <strong>Email:</strong> {request.email}
        </div>
        <div>
          <strong>Experience:</strong> {request.experience}
        </div>
        <div>
          <strong>Title:</strong> {request.title}
        </div>
        <div>
          <strong>Category:</strong> {request.category}
        </div>
        <div>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold px-2 py-1 rounded ${
              request.status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : request.status === "accepted"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {request.status}
          </span>
        </div>

        {request.status === "rejected" && (
          <div className="mt-4">
            <button
              onClick={() => retryMutation.mutate()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={retryMutation.isPending}
            >
              {retryMutation.isPending ? "Re-submitting..." : "Request Again"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRequestPage;
