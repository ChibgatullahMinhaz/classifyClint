import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Rating from "react-rating";
import axiosPublic from "../../Service/AxiosPublic";
import useAuth from "../../Hook/useAuth";
import Swal from "sweetalert2";
import axiosSecure from "../../Service/AxiosSecure";

const fetchClassDetails = async (id) => {
  const res = await axiosSecure.get(`/class/${id}`);
  return res.data;
};

const fetchClassAssignments = async (id) => {
  const res = await axiosSecure.get(`/getAll/assignments/${id}`);
  return res.data;
};

const submitEvaluation = async (evaluation) => {
  return await axiosSecure.post(`/api/evaluation`, evaluation);
};

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const { user } = useAuth();

  const submitAssignment = async (submissionData) => {
    return await axiosSecure.post(
      `/api/assignments/submit?email=${user?.email}`,
      submissionData
    );
  };

  const {
    data: assignments,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["enroll-class-assignments", id],
    queryFn: () => fetchClassAssignments(id),
  });

  const { data: classDetails } = useQuery({
    queryKey: ["enroll-class-details", id],
    queryFn: () => fetchClassDetails(id),
  });

  const { mutate: submitAssignmentMutate, isPending } = useMutation({
    mutationFn: submitAssignment,
    onSuccess: () => {
      refetch();
      Swal.fire({
        icon: "success",
        title: "Assignment Submitted!",
        text: "Your assignment has been submitted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      console.error("Submission Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting your assignment!",
      });
    },
  });

  const handleAssignmentSubmit = (e, assignmentId) => {
    e.preventDefault();
    const docLink = e.target.docLink.value;

    const submissionData = {
      userEmail: user?.email,
      userName: user?.displayName,
      docLink,
      submittedAt: new Date(),
      assignmentId,
      classId: id,
    };

    submitAssignmentMutate(submissionData);
    e.target.reset();
  };

  const handleEvaluationSubmit = async (e) => {
    e.preventDefault();
    try {
      const review = {
        classId: id,
        classTitle: classDetails?.title,
        image: user?.photoURL,
        userEmail: user?.email,
        userName: user?.displayName,
        rating,
        description,
      };

      await submitEvaluation(review);
      setShowEvalModal(false);
      setRating(0);
      setDescription("");

      Swal.fire({
        icon: "success",
        title: "Thanks!",
        text: "Your feedback has been submitted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Evaluation error:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "There was a problem submitting your evaluation.",
      });
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">Failed to load class details.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Evaluation Button */}
      <div className="fixed top-20 right-10 z-50">
        <button
          onClick={() => setShowEvalModal(true)}
          className="btn btn-secondary"
        >
          Teaching Evaluation Report
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Enrolled Class: {classDetails?.title}
      </h2>

      <div className="overflow-x-auto">
        {assignments.length === 0 ? (
          <>
            <p>no assigment found</p>
          </>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Assignment Title</th>
                <th>Description</th>
                <th>Deadline</th>
                <th>Submit</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, idx) => (
                <tr key={assignment._id}>
                  <td>{idx + 1}</td>
                  <td>{assignment?.title}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.deadline}</td>
                  <td>
                    <form
                      onSubmit={(e) =>
                        handleAssignmentSubmit(e, assignment._id)
                      }
                      className="flex flex-col sm:flex-row items-center gap-2"
                    >
                      <input
                        name="docLink"
                        type="url"
                        placeholder="Enter document link"
                        className="input input-bordered input-sm w-full max-w-xs"
                        required
                      />
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        disabled={isPending}
                      >
                        {isPending ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Evaluation Modal */}
      {showEvalModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">
              Teaching Evaluation Report
            </h3>
            <form onSubmit={handleEvaluationSubmit} className="space-y-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your feedback"
                className="textarea textarea-bordered w-full"
                required
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                <Rating
                  initialRating={rating}
                  onChange={(value) => setRating(value)}
                  emptySymbol={<span className="text-gray-400 text-xl">☆</span>}
                  fullSymbol={
                    <span className="text-yellow-500 text-xl">★</span>
                  }
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => setShowEvalModal(false)}
                  className="btn"
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

export default MyEnrollClassDetails;
