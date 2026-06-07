function SportCard({ sport, isActive, onClick }) {
  return (
    <button
      className={isActive ? "sport-card active" : "sport-card"}
      onClick={onClick}
    >
      <span className="sport-icon">{sport.icon}</span>

      <div>
        <h3>{sport.name}</h3>
        <p>{sport.venue}</p>
      </div>

      <small>
        {sport.availableSlots}/{sport.totalSlots} free
      </small>
    </button>
  );
}

export default SportCard;