// MyClassDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../Service/AxiosSecure";
import CreateAssignmentModal from "../Components/CreateAssignmentModal";
import { Card, CardContent } from "../Components/ui/card";
import { Button } from "../Components/ui/button";

// API calls
const fetchClassInfo = async (id) => {
  const res = await axiosSecure.get(`/class-progress/${id}`);
  return res.data;
};

const MyClassDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [assignmentCountState, setAssignmentCountState] = useState(null);

  // Queries
  const { data: classInfo, isLoading: classLoading } = useQuery({
    queryKey: ["classInfo", id],
    queryFn: () => fetchClassInfo(id),
    enabled: !!id,
  });

  const handleAssignmentCreated = () => {
    setAssignmentCountState((prev) =>
      prev !== null ? prev + 1 : classInfo?.assignmentCount + 1
    );
    setShowModal(false);
  };

  const finalAssignmentCount =
    assignmentCountState !== null
      ? assignmentCountState
      : classInfo?.assignmentCount;

  if (classLoading) return <p className="text-center">Loading class info...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Class Progress Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">Total Enrollments</h3>
            <p className="text-2xl text-green-600">
              {classInfo?.enrollmentCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">Total Assignments</h3>
            <p className="text-2xl text-blue-600">{finalAssignmentCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-semibold">Total Submissions</h3>
            <p className="text-2xl text-purple-600">
              {classInfo?.submissionCount}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Class Assignment</h2>
        <Button onClick={() => setShowModal(true)}>Create Assignment</Button>
      </div>

      {showModal && (
        <CreateAssignmentModal
          classId={id}
          onClose={() => setShowModal(false)}
          onCreated={handleAssignmentCreated}
        />
      )}
    </div>
  );
};

export default MyClassDetails;
