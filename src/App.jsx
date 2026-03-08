import FrontPage from "../pages/FrontPage";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { JobProvider } from "../context/jobContext";
import Toast from "../Components/Toast";
import JobDetails from "../pages/JobDetails";
import PostAJob from "../pages/PostAJob";

function App() {
  return (
    <>
      <JobProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path={"/"} element={<FrontPage />} />
            <Route path={"/jobDetails/:jobId"} element={<JobDetails />} />
            <Route path={"/postAJob"} element={<PostAJob />} />
          </Routes>
          <Toast />
        </BrowserRouter>
      </JobProvider>
    </>
  );
}

export default App;
