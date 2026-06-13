import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  async function fetchAdminStats() {
    try {
      setLoading(true);

      const res = await api.get("/api/admin/stats");

      setStats(res.data.data);
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to load admin stats",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdminStats();
  }, []);

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Navbar />

      <main className="app">
        <section className="page-head">
          <div>
            <p className="eyebrow">Admin Control</p>
            <h1>Dashboard</h1>
            <p>
              Monitor SportsSphere activity, bookings, users, and sports from
              one place.
            </p>
          </div>

          <Link to="/sports/cricket" className="page-action">
            Back to sports
          </Link>
        </section>

        {loading ? (
          <div className="panel-message">Loading admin dashboard...</div>
        ) : !stats ? (
          <section className="empty-panel">
            <h2>Admin access required</h2>
            <p>
              You need to be logged in as an admin to view this dashboard.
            </p>
            <Link to="/login">Login</Link>
          </section>
        ) : (
          <section className="stats-grid">
            <article className="stat-card">
              <span>Total Users</span>
              <strong>{stats.totalUsers}</strong>
            </article>

            <article className="stat-card">
              <span>Total Sports</span>
              <strong>{stats.totalSports}</strong>
            </article>

            <article className="stat-card">
              <span>Total Bookings</span>
              <strong>{stats.totalBookings}</strong>
            </article>

            <article className="stat-card">
              <span>Active Bookings</span>
              <strong>{stats.activeBookings}</strong>
            </article>

            <article className="stat-card">
              <span>Cancelled Bookings</span>
              <strong>{stats.cancelledBookings}</strong>
            </article>
          </section>
        )}
      </main>
    </>
  );
}

export default AdminDashboardPage;