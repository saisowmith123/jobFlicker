import React, { useEffect, useState } from "react";
import axios from "axios";

const locations = [
  "New York",
  "San Francisco",
  "Austin",
  "Boston",
  "Chicago",
  "Seattle",
  "Los Angeles",
  "Denver",
  "Atlanta",
  "Dallas",
];

const skillsList = [
  "React",
  "Node.js",
  "MongoDB",
  "Java",
  "Spring Boot",
  "AWS",
  "Angular",
  "TypeScript",
  "CSS",
  "Python",
];

const loggedInUser = {
  name: "Healthfirst",
  role: "company",
};

const CompanyListPage = () => {
  const [filters, setFilters] = useState({
    rating: "",
    location: "",
    jobType: "",
    skill: "",
    companyAge: "",
  });

  const [sortBy, setSortBy] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (page = 1) => {
    setLoading(true);

    const backendFilters = {};

    if (filters.rating) backendFilters.rating = Number(filters.rating);
    if (filters.location) backendFilters.location = filters.location;
    if (filters.jobType) backendFilters.jobType = filters.jobType;
    if (filters.skill) backendFilters.skills = filters.skill;
    if (filters.companyAge) {
      const [minAge, maxAge] = filters.companyAge.split("-").map(Number);
      backendFilters.companyAge = { $min: minAge, $max: maxAge };
    }

    const payload = {
      filters: backendFilters,
      sortBy,
      page: page,
      limit: 9,
    };

    try {
      const response = await axios.post(
        "http://localhost:3100/api/jobs/filter",
        payload
      );

      const data = response.data.jobs;
      let sortedData = [...data];

      if (sortBy === "newest") {
        sortedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (sortBy === "oldest") {
        sortedData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      }

      setJobs(sortedData);
      const totalItems = response.data.total || 0;
      setTotalPages(Math.ceil(totalItems / 9));
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [filters, sortBy, currentPage]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleApply = (jobTitle) => {
    alert(`Successfully applied to ${jobTitle}!`);
  };

  const handleCreateJobPost = () => {
    window.location.href = "/createpost";
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-green-700">Explore Companies</h1>
        {loggedInUser.role === "company" && (
          <button
            onClick={handleCreateJobPost}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Create Job Post
          </button>
        )}
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-white border border-green-200 rounded-lg p-4 mb-8 shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-green-700 text-sm font-medium mb-1">
            Rating
          </label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium mb-1">
            Location
          </label>
          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium mb-1">
            Skill
          </label>
          <select
            name="skill"
            value={filters.skill}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            {skillsList.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium mb-1">
            Company Age
          </label>
          <select
            name="companyAge"
            value={filters.companyAge}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">All</option>
            <option value="0-10">0-10 years</option>
            <option value="10-20">10-20 years</option>
            <option value="20-30">20-30 years</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-green-700 text-sm font-medium mb-1">
            Sort By
          </label>
          <select
            name="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">None</option>
            <option value="newest">Created At: Newest First</option>
            <option value="oldest">Created At: Oldest First</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="col-span-full flex justify-center">
          <button
            onClick={() => {
              setFilters({
                rating: "",
                location: "",
                jobType: "",
                skill: "",
                companyAge: "",
              });
              setSortBy("");
              setCurrentPage(1);
            }}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-green-700 text-center">Loading jobs...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-green-200 rounded-lg shadow hover:shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-green-700 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-green-800 mb-2">
                    <span className="font-semibold">Avg Salary:</span> $
                    {job.salaryEstimation?.min} - ${job.salaryEstimation?.max}
                  </p>
                  <p className="text-green-800 mb-2">
                    <span className="font-semibold">Rating:</span> {job.rating}{" "}
                    ⭐
                  </p>
                  <p className="text-green-800 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location}
                  </p>
                  <p className="text-green-800 mb-2">
                    <span className="font-semibold">Skills:</span>{" "}
                    {job.skills?.join(", ")}
                  </p>
                  <p className="text-green-800 mb-4">
                    <span className="font-semibold">Benefits:</span>{" "}
                    {job.benefits?.join(", ")}
                  </p>

                  {/* Description with tooltip */}
                  <p
                    className="text-green-700 text-sm italic truncate"
                    title={job.description}
                  >
                    {job.description}
                  </p>
                </div>
                <button
                  onClick={() => handleApply(job.title)}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-green-300 rounded hover:bg-green-100 disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-green-700">Page:</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  let page = Number(e.target.value);
                  if (!isNaN(page) && page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-16 text-center border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span className="text-green-700">of {totalPages}</span>
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-green-300 rounded hover:bg-green-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyListPage;
