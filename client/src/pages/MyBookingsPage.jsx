import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";import api from "../services/api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  async function fetchMyBookings() {
    try {
      setLoading(true);

      const res = await api.get("/api/bookings/my-bookings");

      setBookings(res.data.data);
    }  catch (err) {
  if (err.response?.status === 401) {
    navigate("/login", {
      state: {
        from: "/my-bookings",
      },
    });

    return;
  }

  setToast({
    type: "error",
    message: err.response?.data?.message || "Unable to load bookings",
  });
} finally {
  setLoading(false);
}
  }

  async function handleCancelBooking(bookingId) {
    try {
      setCancellingId(bookingId);

      const res = await api.patch(`/api/bookings/${bookingId}/cancel`);

      setToast({
        type: "success",
        message: res.data.message || "Booking cancelled successfully",
      });

      fetchMyBookings();
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to cancel booking",
      });
    } finally {
      setCancellingId(null);
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
            {bookings.map((booking) => {
              const isCancelled = booking.status === "cancelled";

              return (
                <article
                  key={booking.id}
                  className={
                    isCancelled
                      ? "booking-card booking-card-cancelled"
                      : "booking-card"
                  }
                >
                  <div>
                    <span
                      className={
                        isCancelled
                          ? "booking-status cancelled"
                          : "booking-status"
                      }
                    >
                      {booking.status}
                    </span>

                    <h2>{booking.sportName}</h2>
                    <p>{booking.slotTime}</p>
                  </div>

                  <div className="booking-actions">
                    <Link to={`/sports/${booking.sportSlug}`}>View sport</Link>

                    {!isCancelled && (
                      <button
                        type="button"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={cancellingId === booking.id}
                      >
                        {cancellingId === booking.id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </>
  );
}

export default MyBookingsPage;