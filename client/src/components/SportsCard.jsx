function SportsCard({ sport, onViewSlots }) {
  return (
    <div className="sports-card">
      <div className="sports-card__icon">{sport.image}</div>

      <h2>{sport.name}</h2>

      <p>{sport.description}</p>

      <div className="sports-card__venue">
        Venue: {sport.venue}
      </div>

      <button onClick={() => onViewSlots(sport.id)}>
        View Slots
      </button>
    </div>
  );
}

export default SportsCard;