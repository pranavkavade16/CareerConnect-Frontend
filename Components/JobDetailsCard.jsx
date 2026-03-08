const jobTypeTone = (type) => {
  const jobType = type.toUpperCase();

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
const JobDetailsCard = ({ job }) => {
  return (
    <div className="job-card m-5">
      <div className="card-body">
        <div className="m-4">
          <span className={jobTypeTone(job?.jobType)}>{job?.jobType}</span>
        </div>

        <div className="m-4">
          <h3 className="white-text display-4">{job?.title}</h3>

          <h5 className="gray-text">{job?.companyName}</h5>

          <div className="row g-4 mt-3">
            <div className="col-md-4">
              <div className="job-info-card p-3 rounded-4">
                <small className="gray-text d-flex gap-2">◎ Location</small>

                <div className="fw-bold fs-5 job-location">
                  {job?.locations?.join(", ")}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="job-info-card p-3 rounded-4">
                <small className="gray-text d-flex gap-2">Salary</small>

                <div className="fw-bold fs-5 job-salary">{job?.salary} LPA</div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="job-info-card p-3 rounded-4">
                <small className="gray-text d-flex gap-2">⊞ Type</small>

                <div className="fw-bold fs-5 job-type-info">{job?.jobType}</div>
              </div>
            </div>
          </div>
        </div>

        <hr className="section-divider" />

        <div className="m-4">
          <h2 className="white-text m-3">About the Role</h2>

          <p className="gray-text m-3">{job?.jobDescription}</p>

          <h2 className="white-text m-3 mt-5">Qualifications</h2>

          {job.jobQualifications.map((item, index) => (
            <p key={index}>
              <span className="green-text fw-bold fs-5 me-3">{index + 1}</span>

              <span className="gray-text">{item}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsCard;
