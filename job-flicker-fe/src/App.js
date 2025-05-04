import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import CompanyListPage from "./CompanyListPage";
import CreateJobPostPage from "./CreateJobPostPage";
import FillCompanyDetailsPage from "./FillCompanyDetailsPage";
import AppliedPage from "./AppliedPage";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
