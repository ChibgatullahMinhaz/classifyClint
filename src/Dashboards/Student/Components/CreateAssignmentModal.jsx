import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../../../Service/AxiosSecure";
import Swal from "sweetalert2";

const createAssignment = async (assignmentData) => {
  const response = await axiosSecure.post("/assignments", assignmentData);
  return response.data;
};

const CreateAssignmentModal = ({ classId, onClose, onCreated }) => {
    
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const queryClient = useQueryClient();

  // Mutation with TanStack Query v5
  const mutation = useMutation({
    mutationFn: createAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
      Swal.fire({
        icon: "success",
        title: "Assignment Created!",
        text: "Your assignment has been successfully created.",
        timer: 2000,
        showConfirmButton: false,
      });
      onCreated();
      reset();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create assignment. Please try again.",
      });
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    // Add classId with form data
    console.log(data);
    mutation.mutate({ classId, ...data });
  };

  return (
    <>
      {/* Background overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <h2 className="text-xl font-semibold mb-4">Create Assignment</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Assignment Title</label>
              <input
                type="text"
                className={`w-full border px-3 py-2 rounded ${
                  errors.title ? "border-red-500" : ""
                }`}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Assignment Deadline
              </label>
              <input
                type="date"
                className={`w-full border px-3 py-2 rounded ${
                  errors.deadline ? "border-red-500" : ""
                }`}
                {...register("deadline", { required: "Deadline is required" })}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Assignment Description
              </label>
              <textarea
                className={`w-full border px-3 py-2 rounded ${
                  errors.description ? "border-red-500" : ""
                }`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Add Assignment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAssignmentModal;
