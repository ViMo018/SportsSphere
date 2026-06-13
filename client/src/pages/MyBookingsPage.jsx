import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  async function fetchMyBookings() {
    try {
      setLoading(true);

      const res = await api.get("/api/bookings/my-bookings");

      setBookings(res.data.data);
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to load bookings",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Navbar />

      <main className="app">
        <section className="page-head">
          <div>
            <p className="eyebrow">Your reservations</p>
            <h1>My Bookings</h1>
            <p>
              Track the sports slots you have booked from your SportsSphere
              account.
            </p>
          </div>

          <Link to="/sports/cricket" className="page-action">
            Book another slot
          </Link>
        </section>

        {loading ? (
          <div className="panel-message">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <section className="empty-panel">
            <h2>No bookings yet</h2>
            <p>
              You have not booked any sports slot yet. Go pick a sport before
              someone else grabs the good timing.
            </p>
            <Link to="/sports/cricket">Explore sports</Link>
          </section>
        ) : (
          <section className="bookings-grid">
            {bookings.map((booking) => (
              <article key={booking.id} className="booking-card">
                <div>
                  <span className="booking-status">{booking.status}</span>
                  <h2>{booking.sportName}</h2>
                  <p>{booking.slotTime}</p>
                </div>

                <Link to={`/sports/${booking.sportSlug}`}>View sport</Link>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
}

export default MyBookingsPage;