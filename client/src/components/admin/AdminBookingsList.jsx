import { Link } from "react-router-dom";

function AdminBookingsList({ adminBookings }) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="eyebrow">Booking Monitor</p>
          <h2>All Bookings</h2>
        </div>
      </div>

      {adminBookings.length === 0 ? (
        <div className="panel-message">No bookings found yet.</div>
      ) : (
        <div className="admin-bookings-list">
          {adminBookings.map((booking) => {
            const isCancelled = booking.status === "cancelled";

            return (
              <article key={booking.id} className="admin-booking-row">
                <div className="admin-booking-main">
                  <span
                    className={
                      isCancelled
                        ? "booking-status cancelled"
                        : "booking-status"
                    }
                  >
                    {booking.status}
                  </span>

                  <strong>{booking.sportName}</strong>
                  <p>{booking.slotTime}</p>
                </div>

                <div className="admin-booking-user">
                  <strong>{booking.userName}</strong>
                  <span>{booking.userEmail}</span>
                </div>

                <Link to={`/sports/${booking.sportSlug}`}>View sport</Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AdminBookingsList;