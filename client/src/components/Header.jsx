function Header({ sportsCount }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">IIITA Sports Booking</p>
        <h1>Book your next game.</h1>
        <p>
          Check live slot availability, pick your sport, and reserve your game
          before the group chat turns into a courtroom.
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