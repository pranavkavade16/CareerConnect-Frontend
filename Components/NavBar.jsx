import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="d-flex justify-content-between">
        <h2 className="mt-5 ms-5 white-text">CareerConnect</h2>
        <div className="mt-5 me-5">
          <Link className="nav-btn active me-3">Browse Jobs</Link>
          <Link className="nav-btn active me-3" to={`/postAJob`}>
            Post a Job
          </Link>
        </div>
      </div>
      <hr className="section-divider" />
    </nav>
  );
};

export default NavBar;
