import useJobContext from "../context/jobContext";
import JobCard from "../Components/JobCard";
import useSearch from "../customHooks/useSearch";

const FrontPage = () => {
  const { jobs, setJobs, showToast, jobLoading, jobError } = useJobContext();

  const jobList = Array.isArray(jobs) ? jobs : [];

  const { search, setSearch, searchedJobs } = useSearch(jobList);

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(
        `https://career-connect-backend-rust.vercel.app/job/${jobId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete the job");
      }

      const deletedJob = await response.json();

      console.log("Job deleted successfully", deletedJob);

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      showToast("Job deleted successfully.");
    } catch (error) {
      console.log("Failed to delete the job", error.message);
    }
  };

  if (jobLoading)
    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <div className="spinner-border text-dark mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-dark fs-5">Loading...</p>
        </div>
      </div>
    );
  if (jobError)
    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <p className="text-dark fs-5">Error: {leadsError || agentsError}</p>
        </div>
      </div>
    );
  if (jobList.length === 0)
    return (
      <div>
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <p className="text-dark fs-5">No Data Available.</p>
        </div>
      </div>
    );

  return (
    <div className="m-5">
      <h1 className="display-4 white-text">
        Find your next <span className="green-text">Opportunity</span>
      </h1>

      <div className="input-group mb-3 w-100">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search projects and tasks..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-2 g-3 mt-5">
        {searchedJobs.length > 0 ? (
          searchedJobs.map((job) => (
            <div key={job._id}>
              <JobCard job={job} deleteJob={handleDeleteJob} />
            </div>
          ))
        ) : (
          <div>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
              <p className="text-dark fs-5">No Jobs Found!!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontPage;
