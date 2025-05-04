import React, { useEffect, useState } from "react";
import axios from "axios";

const AppliedPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || !userData._id) {
          alert("Please log in to view your applied jobs.");
          setLoading(false);
          return;
        }

        // ✅ POST to /api/jobs/byIds with { user_id }
        const response = await axios.post(
          "https://jobflicker.onrender.com/api/jobs/byIds",
          {
            user_id: userData._id,
          }
        );

        setAppliedJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Failed to fetch applied jobs:", error);
        alert("An error occurred while fetching your applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Your Applications
      </h1>

      {loading ? (
        <p className="text-green-700 text-center">
          Loading your applications...
        </p>
      ) : appliedJobs.length === 0 ? (
        <p className="text-green-700 text-center">
          You haven't applied to any jobs yet.
        </p>
      ) : (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {appliedJobs.map((job) => (
            <li
              key={job._id}
              className="bg-white border border-green-200 rounded-lg shadow hover:shadow-lg p-4 flex flex-col"
            >
              <h2 className="text-xl font-bold text-green-700 mb-2">
                {job.title}
              </h2>
              <p className="text-green-800 mb-1">
                <span className="font-semibold">Company:</span>{" "}
                {job.companyName}
              </p>
              <p className="text-green-800 mb-1">
                <span className="font-semibold">Location:</span> {job.location}
              </p>
              <p className="text-green-800 mb-1">
                <span className="font-semibold">Rating:</span> {job.rating} ⭐
              </p>
              <p
                className="text-green-800 mb-2 truncate"
                title={job.description}
              >
                <span className="font-semibold">Description:</span>{" "}
                {job.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppliedPage;
