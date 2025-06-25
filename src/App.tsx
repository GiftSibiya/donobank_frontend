import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoutes";

// PAGE IMPORTS
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/home/LoginPage";
import UserHome from "./pages/user/UserHome";
import DonationsPage from "./pages/donations/DonationsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* USER PAGES */}
        <Route path="/user" element={<ProtectedRoute allowedRoles={['user']}><UserHome /></ProtectedRoute>} />

        {/* DONATIONS PAGE */}
        <Route path="/donations" element={<DonationsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;