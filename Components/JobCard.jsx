import { Link } from "react-router-dom";

const jobTypeTone = (type) => {
  const jobType = type?.toUpperCase() || "";

  if (jobType.includes("FULL") && jobType.includes("REMOTE"))
    return "job-type job-full-remote";

  if (jobType.includes("PART") && jobType.includes("REMOTE"))
    return "job-type job-part-remote";

  if (jobType.includes("FULL") && jobType.includes("ON-SITE"))
    return "job-type job-full-onsite";

  if (jobType.includes("PART") && jobType.includes("ON-SITE"))
    return "job-type job-part-onsite";

  return "job-type job-default";
};

const JobCard = ({ job, deleteJob }) => {
  return (
    <div className="job-card">
      <div className="card-body d-flex flex-column">
     
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          <div className="me-2">
            <h5 className="fw-semibold text-break">{job?.title}</h5>
            <p className="mb-1 text-break">{job?.companyName}</p>
          </div>

          <div className="mt-1 mt-sm-0">
            <span className={jobTypeTone(job?.jobType)}>{job?.jobType}</span>
          </div>
        </div>

      
        <div>
          <p className="text-break">Locations: {job?.locations?.join(", ")}</p>
        </div>


        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2">
          <Link
            className="nav-btn active w-100 d-flex justify-content-center align-items-center"
            style={{
              background: "#6366f1",
              border: "1px solid #6366f1",
              color: "#ffffff",
            }}
            to={`/jobDetails/${job._id}`}
          >
            View Details
          </Link>

          <button
            className="nav-btn active w-100 d-flex justify-content-center align-items-center"
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#ef4444",
            }}
            onClick={() => deleteJob(job._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
