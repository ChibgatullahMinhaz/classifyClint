// MyClasses.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/my-classes") // replace with actual API
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this class?");
    if (confirm) {
      await fetch(`/api/class/${id}`, { method: "DELETE" });
      setClasses(classes.filter((cls) => cls._id !== id));
    }
  };

  const handleUpdate = (cls) => {
    setSelectedClass(cls);
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedClass = {
      title: form.title.value,
      price: form.price.value,
      description: form.description.value,
      image: form.image.value,
    };
    await fetch(`/api/class/${selectedClass._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedClass),
    });

    setShowUpdateModal(false);
    setSelectedClass(null);
    // re-fetch
    const res = await fetch("/api/my-classes");
    const data = await res.json();
    setClasses(data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Classes</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <div key={cls._id} className="card bg-base-100 shadow-md p-4 space-y-2">
            <img src={cls.image} alt="class" className="rounded" />
            <h3 className="text-xl font-semibold">{cls.title}</h3>
            <p><strong>Name:</strong> {cls.name}</p>
            <p><strong>Email:</strong> {cls.email}</p>
            <p><strong>Price:</strong> ${cls.price}</p>
            <p>{cls.description}</p>
            <p><strong>Status:</strong> {cls.status}</p>
            <div className="flex justify-between">
              <button className="btn btn-sm btn-warning" onClick={() => handleUpdate(cls)}>Update</button>
              <button className="btn btn-sm btn-error" onClick={() => handleDelete(cls._id)}>Delete</button>
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

      {showUpdateModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Class</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-2">
              <input name="title" defaultValue={selectedClass.title} className="input input-bordered w-full" />
              <input name="price" type="number" defaultValue={selectedClass.price} className="input input-bordered w-full" />
              <input name="image" defaultValue={selectedClass.image} className="input input-bordered w-full" />
              <textarea name="description" defaultValue={selectedClass.description} className="textarea textarea-bordered w-full" />
              <div className="modal-action">
                <button type="submit" className="btn btn-success">Update</button>
                <button onClick={() => setShowUpdateModal(false)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
