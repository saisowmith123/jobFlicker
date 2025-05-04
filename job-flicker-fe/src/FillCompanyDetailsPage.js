import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateJobPostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salaryMin: "",
    salaryMax: "",
    salaryAvg: "",
    rating: "",
    location: "",
    jobState: "",
    companyAge: "",
    jobType: "Full-Time",
    seniority: false,
    skills: "",
    benefits: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyId = localStorage.getItem("companyId");
    if (!companyId) {
      alert("Company ID not found. Please fill in company details first.");
      return;
    }

    const jobPost = {
      companyId,
      title: formData.title,
      description: formData.description,
      salaryEstimation: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
        avg: Number(formData.salaryAvg),
      },
      rating: Number(formData.rating),
      location: formData.location,
      jobState: formData.jobState,
      sameState: true, // you can make this dynamic if needed
      companyAge: Number(formData.companyAge),
      jobType: formData.jobType,
      seniority: formData.seniority,
      skills: formData.skills.split(",").map((s) => s.trim()),
      benefits: formData.benefits.split(",").map((b) => b.trim()),
    };

    try {
      const response = await axios.post(
        "http://localhost:3100/api/jobs",
        jobPost
      );

      if (response.data.message === "Job created successfully") {
        console.log("Job created:", response.data.job);
        alert("Job post created successfully!");

        // ✅ Navigate to the /companies page
        navigate("/companies");
      } else {
        alert("Something went wrong while creating the job post.");
      }
    } catch (error) {
      console.error("Error submitting job post:", error);
      alert("Failed to submit job post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-2xl border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Create Job Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Title */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          {/* Salary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Salary Min
              </label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Salary Max
              </label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Salary Avg
              </label>
              <input
                type="number"
                name="salaryAvg"
                value={formData.salaryAvg}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Rating & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Job State & Company Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Job State
              </label>
              <input
                type="text"
                name="jobState"
                value={formData.jobState}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Company Age
              </label>
              <input
                type="number"
                name="companyAge"
                value={formData.companyAge}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Job Type
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>

          {/* Seniority */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="seniority"
              checked={formData.seniority}
              onChange={handleChange}
              className="mr-2 border-green-300 focus:ring-2 focus:ring-green-400"
            />
            <label className="text-green-700 text-sm font-medium">
              Seniority Required
            </label>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., Python, SQL"
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Benefits (comma-separated)
            </label>
            <input
              type="text"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="e.g., Health Insurance, 401k"
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Submit Job Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPostPage;
