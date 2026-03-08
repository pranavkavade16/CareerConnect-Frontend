import { useState } from "react";
import useJobContext from "../context/jobContext";

const NewJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    salary: "",
    locations: [],
    jobType: "Part-time(On-site)",
    jobDescription: "",
    jobQualifications: [],
  });

  const [locationInput, setLocationInput] = useState("");
  const [qualificationInput, setQualificationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setJobs } = useJobContext;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const commitLocations = () => {
    const locations = locationInput
      .split(",")
      .map((location) => location.trim())
      .filter(Boolean);

    setFormData((prev) => ({ ...prev, locations }));
  };

  const commitQualifications = () => {
    const qualifications = qualificationInput
      .split(",")
      .map((q) => q.trim())
      .filter(Boolean);

    setFormData((prev) => ({ ...prev, jobQualifications: qualifications }));
  };

  const jobTypes = [
    "Full-time (On-site)",
    "Part-time (On-site)",
    "Full-time (Remote)",
    "Part-time (Remote)",
  ];
  const handleSubmit = async () => {
    if (isSubmitting) return;

    const { title, companyName, salary, locations, jobDescription } = formData;

    if (!title || !companyName || !salary || !locations || !jobDescription) {
      showToast("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "https://career-connect-backend-rust.vercel.app/job",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            salary: Number(formData.salary),
          }),
        },
      );

      const data = await response.json();
      console.log("Job Added:", data);
      setJobs((prev) => [data.savedJob, ...prev]);

      showToast("Job added successfully");

      setFormData({
        title: "",
        companyName: "",
        salary: "",
        locations: [],
        jobType: "Part-time(On-site)",
        jobDescription: "",
        jobQualifications: [],
      });

      setLocationInput("");
      setQualificationInput("");
    } catch (error) {
      console.log("Failed to create a job", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-card m-5">
      <div className="card-body">
        <h3>Add New Job</h3>
        <p className="gray-text">Create a new job posting for candidates.</p>
        <hr />

        <div className="m-2">
          <label className="form-label">
            <strong>Job Title *</strong>
          </label>

          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="eg: Senior Frontend Engineer"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="m-2">
          <label className="form-label">
            <strong>Company Name *</strong>
          </label>

          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              name="companyName"
              placeholder="eg: Stripe"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="m-2">
          <label className="form-label">
            <strong>Salary *</strong>
          </label>

          <div className="input-group w-50">
            <input
              type="number"
              className="form-control"
              name="salary"
              placeholder="eg: 12 LPA"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="m-2">
          <label className="form-label">
            <strong>Locations *</strong>
          </label>

          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="eg: Mumbai, Pune"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onBlur={commitLocations}
            />
          </div>
        </div>

        <div className="m-2">
          <label className="form-label">
            <strong>Job Type</strong>
          </label>

          <select
            className="form-select w-50"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="m-2">
          <label className="form-label">
            <strong>Job Description *</strong>
          </label>

          <textarea
            className="form-control w-50"
            rows="4"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
          />
        </div>

        <div className="m-2">
          <label className="form-label">
            <strong>Qualifications</strong>
          </label>

          <div className="input-group w-50">
            <input
              type="text"
              className="form-control"
              placeholder="eg: React, TypeScript, Node"
              value={qualificationInput}
              onChange={(e) => setQualificationInput(e.target.value)}
              onBlur={commitQualifications}
            />
          </div>
        </div>

        <div className="m-3 mt-4">
          <button
            className="nav-btn btn-view"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Saving..." : "Create Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewJobForm;
