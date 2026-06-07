import SportsCard from "./SportsCard";

function SportsList({ sports, onViewSlots }) {
  if (sports.length === 0) {
    return (
      <section className="sports-section">
        <div className="section-heading">
          <p className="section-kicker">Sports</p>
          <h2>No sports listed yet</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="sports-section">
      <div className="section-heading">
        <p className="section-kicker">Available sports</p>
        <h2>Pick a game and check what is open</h2>
        <p>
          These sports are coming from your Express API, not hardcoded inside
          the React component.
        </p>
      </div>

      <div className="sports-grid">
        {sports.map((sport) => (
          <SportsCard
            key={sport.id}
            sport={sport}
            onViewSlots={onViewSlots}
          />
        ))}
      </div>
    </section>
  );
}

export default SportsList;