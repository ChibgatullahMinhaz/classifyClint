import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import Rating from "react-rating";

const fetchClassDetails = async (id) => {
  const res = await axios.get(`/api/my-enroll-class/${id}`);
  return res.data;
};

const submitAssignment = async ({ assignmentId, submissionData }) => {
  return await axios.post(`/api/assignments/submit/${assignmentId}`, submissionData);
};

const submitEvaluation = async (evaluation) => {
  return await axios.post(`/api/evaluation`, evaluation);
};

const MyEnrollClassDetails = () => {
  const { id } = useParams();
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const { data: classData, isLoading, error, refetch } = useQuery({
    queryKey: ["enroll-class", id],
    queryFn: () => fetchClassDetails(id),
  });

  const mutation = useMutation(submitAssignment, {
    onSuccess: () => {
      refetch(); // re-fetch data to update submission count
    },
  });

  const handleAssignmentSubmit = (e, assignmentId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    mutation.mutate({
      assignmentId,
      submissionData: formData,
    });
  };

  const handleEvaluationSubmit = async (e) => {
    e.preventDefault();
    await submitEvaluation({ classId: id, rating, description });
    setShowEvalModal(false);
    setRating(0);
    setDescription("");
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load class details.</p>;

  const { title, assignments = [] } = classData || {};

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* TER Button */}
      <div className="fixed top-20 right-10 z-50">
        <button onClick={() => setShowEvalModal(true)} className="btn btn-secondary">
          Teaching Evaluation Report
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Enrolled Class: {title}</h2>

      <div className="overflow-x-auto">
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
                <td>{assignment.title}</td>
                <td>{assignment.description}</td>
                <td>{assignment.deadline}</td>
                <td>
                  <form
                    onSubmit={(e) => handleAssignmentSubmit(e, assignment._id)}
                    className="flex items-center gap-2"
                  >
                    <input
                      name="submission"
                      type="file"
                      className="file-input file-input-bordered file-input-sm"
                      required
                    />
                    <button type="submit" className="btn btn-sm btn-primary">
                      Submit
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evaluation Modal */}
      {showEvalModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-lg mb-4">Teaching Evaluation Report</h3>
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
                  fullSymbol={<span className="text-yellow-500 text-xl">★</span>}
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-success">Send</button>
                <button onClick={() => setShowEvalModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEnrollClassDetails;
