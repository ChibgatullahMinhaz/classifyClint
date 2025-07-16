import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import axiosSecure from "../../Service/AxiosSecure";
import useAuth from "../../Hook/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";

const MyClasses = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch classes
  const {
    data: classes = [],
    isLoading,
    isPending,
    refetch
  } = useQuery({
    queryKey: ["my-classes", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-classes?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/class/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
      Swal.fire("Deleted!", "Your class has been deleted.", "success");
      refetch()
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong.",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      return axiosSecure.put(`/class/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
      Swal.fire("Updated!", "Your class has been updated.", "success");
      setShowUpdateModal(false);
      setSelectedClass(null);
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong.",
        "error"
      );
    },
  });

  const handleUpdate = (cls) => {
    setSelectedClass(cls);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedClass = {
      title: form.title.value,
      price: form.price.value,
      description: form.description.value,
      image: form.image.value,
    };
    updateMutation.mutate({ id: selectedClass._id, data: updatedClass });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Classes</h2>
      <div className="">
        {isLoading || isPending ? (
          <LoadingSpinner />
        ) : classes.length === 0 ? (
          <div className="text-center mt-20">
            <h3 className="text-2xl font-semibold text-gray-700">
              No Classes Found
            </h3>
            <p className="text-gray-500 mt-2">
              You haven't added any classes yet. Click the{" "}
              <Link
                to={`/teacher-dashboard/addClass`}
                className="font-semibold"
              >
                "Add Class"
              </Link>{" "}
              button to get started!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <div
                key={cls._id}
                className="card bg-base-100 shadow-md p-4 space-y-2 self-start"
              >
                <img src={cls.image} alt="class" className="rounded" />
                <h3 className="text-xl font-semibold">{cls.title}</h3>
                <p>
                  <strong>Name:</strong> {cls.name}
                </p>
                <p>
                  <strong>Email:</strong> {cls.email}
                </p>
                <p>
                  <strong>Price:</strong> ${cls.price}
                </p>
                <p>{cls.description}</p>
                <p>
                  <strong>Status:</strong> {cls.status}
                </p>
                <div className="flex justify-between">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleUpdate(cls)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(cls._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => navigate(`/dashboard/my-class/${cls._id}`)}
                    disabled={cls.status !== "approved"}
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for updating */}
      {showUpdateModal && selectedClass && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Class</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-2">
              <input
                name="title"
                defaultValue={selectedClass.title}
                className="input input-bordered w-full"
              />
              <input
                name="price"
                type="number"
                defaultValue={selectedClass.price}
                className="input input-bordered w-full"
              />
              <input
                name="image"
                defaultValue={selectedClass.image}
                className="input input-bordered w-full"
              />
              <textarea
                name="description"
                defaultValue={selectedClass.description}
                className="textarea textarea-bordered w-full"
              />
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Update
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setSelectedClass(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
