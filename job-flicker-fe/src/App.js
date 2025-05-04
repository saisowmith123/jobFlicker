import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AuthPage from "./AuthPage";
import CompanyListPage from "./CompanyListPage";
import CreateJobPostPage from "./CreateJobPostPage";
import FillCompanyDetailsPage from "./FillCompanyDetailsPage";
import AppliedPage from "./AppliedPage";
import Navbar from "./components/Navbar";

const AppContent = () => {
  const location = useLocation();

  const showNavbar = location.pathname !== "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/companies" element={<CompanyListPage />} />
        <Route path="/createpost" element={<CreateJobPostPage />} />
        <Route
          path="/fillCompanyDetails"
          element={<FillCompanyDetailsPage />}
        />
        <Route path="/appliedJobs" element={<AppliedPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
