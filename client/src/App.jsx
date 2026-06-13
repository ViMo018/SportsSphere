import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/" element={<Navigate to="/sports/cricket" replace />} />
        <Route path="/sports/:sportId" element={<DashboardPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/sports/cricket" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;