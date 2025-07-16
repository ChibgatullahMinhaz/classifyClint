import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../Hook/useAuth";
import axiosSecure from "../../Service/AxiosSecure";
import Swal from "sweetalert2";

const AddClass = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      image: "",
    },
  });

  // Mutation with TanStack Query v5
  const addClassMutation = useMutation({
    mutationFn: async (classData) => {
      return axiosSecure.post(`/addClasses`, classData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-classes"] }); 
       Swal.fire({
            icon: "success",
            title: "Approved!",
            text: "Thanks for adding Class please wait to approve!.",
            timer: 2000,
            showConfirmButton: false,
          });
      reset();
      navigate("/teacher-dashboard/myClass");
    },
    onError: (error) => {
      alert("Failed to add class. Please try again.");
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    const classData = {
      ...data,
      name: user?.displayName,
      email: user?.email,
      status: "pending",
      createdAt: new Date(),
    };
    addClassMutation.mutate(classData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded-md shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">Add a New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price must be positive" },
            })}
            className={`input input-bordered w-full ${errors.price ? "input-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className={`textarea textarea-bordered w-full ${errors.description ? "textarea-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            {...register("image", { required: "Image URL is required" })}
            className={`input input-bordered w-full ${errors.image ? "input-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.image && <p className="text-red-500 mt-1">{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isSubmitting || addClassMutation.isLoading}
        >
          {isSubmitting || addClassMutation.isLoading ? "Adding..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
