import { useParams } from "react-router-dom";
import useJobContext from "../context/jobContext";
import JobDetailsCard from "../Components/JobDetailsCard";

const JobDetails = () => {
  const { jobData, jobError, jobLoading } = useJobContext();
  const { jobId } = useParams();

  const jobList = Array.isArray(jobData?.jobs) ? jobData.jobs : [];
  const selectedJob = jobList.find((job) => job._id === jobId);

  if (jobLoading)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark mb-3" role="status"></div>
        <p className="text-dark fs-5">Loading...</p>
      </div>
    );

  if (jobError)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-danger fs-5">Error: {jobError}</p>
      </div>
    );

  if (!selectedJob)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-muted fs-5">No Data Available.</p>
      </div>
    );

  return (
    <div>
      <JobDetailsCard job={selectedJob} />
    </div>
  );
};

export default JobDetails;
