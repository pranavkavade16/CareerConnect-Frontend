import { useMemo, useState } from "react";

const useSearch = (jobs = []) => {
  const [search, setSearch] = useState("");

  const normalize = (value) => (value ?? "").toString().toLowerCase();
  const q = normalize(search);

  const searchedJobs = useMemo(() => {
    if (!q) return jobs;

    return jobs.filter((job) => {
      const title = normalize(job?.title);
      const company = normalize(job?.companyName);
      const locations = normalize(job?.locations?.join(", "));
      const type = normalize(job?.jobType);
      const description = normalize(job?.jobDescription);
      const qualifications = normalize(job?.jobQualifications?.join(", "));
      const salary = normalize(job?.salary);

      return (
        title.includes(q) ||
        company.includes(q) ||
        locations.includes(q) ||
        type.includes(q) ||
        description.includes(q) ||
        qualifications.includes(q) ||
        salary.includes(q)
      );
    });
  }, [jobs, q]);

  return { search, setSearch, searchedJobs };
};

export default useSearch;
