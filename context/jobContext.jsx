import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../customHooks/useFetch";
const JobContext = createContext();

const useJobContext = () => useContext(JobContext);

export default useJobContext;

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [toastMessage, setToastMessage] = useState({
    visible: false,
    message: "",
    title: "Notification",
    id: 0,
  });
  const {
    data: jobData,
    error: jobError,
    loading: jobLoading,
    fetchData: fetchJobs,
  } = useFetch("https://career-connect-backend-rust.vercel.app/job");
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  useEffect(() => {
    if (jobData?.jobs) {
      setJobs(jobData.jobs);
    }
  }, [jobData]);

  const showToast = (message, title = "Notification") => {
    setToastMessage({ visible: true, message, title, id: Date.now() });
  };

  const hideToast = () => {
    setToastMessage((prev) => ({ ...prev, visible: false }));
  };

  return (
    <JobContext.Provider
      value={{
        jobData,
        jobError,
        jobLoading,
        fetchJobs,

        jobs,
        setJobs,

        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
