import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeacherClassDetails = () => {
  const { id } = useParams();
  const [classData, setClassData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`/api/class-details/${id}`)
      .then((res) => res.json())
      .then((data) => setClassData(data));
  }, [id]);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const assignment = {
      title: form.title.value,
      deadline: form.deadline.value,
      description: form.description.value,
      classId: id,
    };
    await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assignment),
    });

    setShowModal(false);
    const res = await fetch(`/api/class-details/${id}`);
    const data = await res.json();
    setClassData(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Class Details</h2>

      {/* Class Progress */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card bg-base-200 p-4 text-center">
          <h3 className="text-lg font-bold">Total Enrollments</h3>
          <p className="text-2xl">{classData.enrollments || 0}</p>
        </div>
        <div className="card bg-base-200 p-4 text-center">
          <h3 className="text-lg font-bold">Total Assignments</h3>
          <p className="text-2xl">{classData.assignments?.length || 0}</p>
        </div>
        <div className="card bg-base-200 p-4 text-center">
          <h3 className="text-lg font-bold">Total Submissions</h3>
          <p className="text-2xl">{classData.submissions || 0}</p>
        </div>
      </div>

      {/* Assignment Section */}
      <div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary mb-4">
          Create Assignment
        </button>

        {classData.assignments?.length > 0 && (
          <div className="space-y-2">
            {classData.assignments.map((a) => (
              <div key={a._id} className="border p-2 rounded bg-base-100">
                <h4 className="font-bold">{a.title}</h4>
                <p>Deadline: {a.deadline}</p>
                <p>{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assignment Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Assignment</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-2">
              <input name="title" placeholder="Title" className="input input-bordered w-full" required />
              <input name="deadline" type="date" className="input input-bordered w-full" required />
              <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full" required />
              <div className="modal-action">
                <button type="submit" className="btn btn-success">Add</button>
                <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherClassDetails ;
