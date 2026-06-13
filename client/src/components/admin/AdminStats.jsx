function AdminStats({ stats }) {
  return (
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
  );
}

export default AdminStats;