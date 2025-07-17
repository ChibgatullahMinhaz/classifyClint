import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../Service/AxiosSecure";
import { Card, CardContent } from "../../Student/Components/ui/card";

// API calls
const fetchClassInfo = async (id) => {
  const res = await axiosSecure.get(`/class-progress/${id}`);
  return res.data;
};

const ClassProgreess = () => {
  const { id } = useParams();

  // Queries
  const { data: classInfo, isLoading: classLoading } = useQuery({
    queryKey: ["classInfo", id],
    queryFn: () => fetchClassInfo(id),
    enabled: !!id,
  });

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
            <p className="text-2xl text-blue-600">{classInfo?.assignmentCount}</p>
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
    </div>
  );
};

export default ClassProgreess;
