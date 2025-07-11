import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth"; // assuming you have an auth context

const categories = [
  "Web Development",
  "Digital Marketing",
  "Graphic Design",
  "Cyber Security",
  "Data Science",
];

const experienceOptions = ["Beginner", "Mid-level", "Experienced"];

const TeachForm = () => {
  const { user, role } = useAuth(); // user = {name, email, photoURL}, role = student/teacher/pending
  const { register, handleSubmit, reset } = useForm();

  const { data: existingRequest } = useQuery({
    queryKey: ["teacherRequest", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/api/teacher-request/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post("/api/teacher-request", formData);
      return res.data;
    },
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data) => {
    const submission = {
      ...data,
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      status: "pending",
    };
    mutation.mutate(submission);
  };

  const handleRequestAgain = async () => {
    await axios.patch(`/api/teacher-request/retry/${user.email}`, {
      status: "pending",
    });
    window.location.reload();
  };

  if (role === "teacher") {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold">You're already a teacher! 🎉</h2>
      </div>
    );
  }

  if (existingRequest?.status === "pending") {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-xl font-semibold text-yellow-600">Your request is under review. Please wait for admin approval.</h2>
      </div>
    );
  }

  if (existingRequest?.status === "rejected") {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center">
        <h2 className="text-xl text-red-600 mb-4">Your last request was rejected.</h2>
        <button
          onClick={handleRequestAgain}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Request Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Apply to Teach on EduManage</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            value={user.displayName}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            value={user.email}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1">Experience Level</label>
          <select {...register("experience")} required className="w-full border p-2 rounded">
            <option value="">Select experience</option>
            {experienceOptions.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Class Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter class title"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select {...register("category")} required className="w-full border p-2 rounded">
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {mutation.isPending ? "Submitting..." : "Submit for Review"}
        </button>
      </form>
    </div>
  );
};

export default TeachForm;
