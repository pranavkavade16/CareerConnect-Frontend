import { useParams } from "react-router-dom";
import useJobContext from "../context/jobContext";
import JobDetailsCard from "../Components/JobDetailsCard";

const JobDetails = () => {
  const { jobData, jobError, jobLoading } = useJobContext();
  const { jobId } = useParams();

  const jobList = Array.isArray(jobData?.jobs) ? jobData.jobs : [];
  const selectedJob = jobList.find((job) => job._id === jobId);

  if (jobLoading) {
    return <p>Loading job details...</p>;
  }

  if (jobError) {
    return <p>Error loading job</p>;
  }

  if (!selectedJob) {
    return <p>Job not found</p>;
  }

  return (
    <div>
      <JobDetailsCard job={selectedJob} />
    </div>
  );
};

export default JobDetails;
