function Header({ sportsCount }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">IIITA Sports Booking</p>
        <h1>SportsSphere</h1>
        <p>
          Browse sports, check available slots, and book your game without
          fighting in ten WhatsApp groups.
        </p>
      </div>

      <div className="hero-card">
        <span>{sportsCount}</span>
        <p>sports available</p>
      </div>
    </section>
  );
}

export default Header;