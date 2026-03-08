import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="d-flex flex-wrap justify-content-between align-items-center px-3 px-md-5 py-4">
        <h2 className="white-text mb-2 mb-md-0 mt-3">CareerConnect</h2>

        <div className="d-flex flex-wrap gap-2 justify-content-start justify-content-md-end mt-3">
          <Link className="nav-btn active">Browse Jobs</Link>

          <Link className="nav-btn active" to={`/postAJob`}>
            Post a Job
          </Link>
        </div>
      </div>

      <hr className="section-divider" />
    </nav>
  );
};

export default NavBar;
