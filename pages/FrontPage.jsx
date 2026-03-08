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
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error("Failed to delete the job");
      }

      await response.json();

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      showToast("Job deleted successfully.");
    } catch (error) {
      console.log("Failed to delete the job", error.message);
    }
  };

  
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


  if (jobList.length === 0)
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <p className="text-muted fs-5">No Data Available.</p>
      </div>
    );

  return (
    <div className="container py-3">

      <div className="mb-4">
        <h1 className="fw-bold white-text display-6 display-md-5">
          Find your next <span className="green-text">Opportunity</span>
        </h1>
        <p className="gray-text">
          Discover opportunities at the world's most innovative companies.
        </p>
      </div>

     
      <div className="input-group mb-4">
        <span className="input-group-text bg-white border-end-0">
          <i className="bi bi-search"></i>
        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {searchedJobs.length > 0 ? (
          searchedJobs.map((job) => (
            <div key={job._id} className="col-12 col-md-6 col-xl-6">
              <JobCard job={job} deleteJob={handleDeleteJob} />
            </div>
          ))
        ) : (
          <div className="text-center mt-5">
            <p className="text-muted fs-5">No Jobs Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrontPage;
