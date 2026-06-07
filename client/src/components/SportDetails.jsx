import SlotCard from "./SlotCard";

function SportDetails({ sport, loading, onBookSlot }) {
  if (loading || !sport) {
    return (
      <section className="details-panel">
        <div className="empty-state">Loading sport details...</div>
      </section>
    );
  }

  return (
    <section className="details-panel">
      <div className="sport-header">
        <div>
          <span className="big-icon">{sport.icon}</span>
          <h2>{sport.name}</h2>
          <p>{sport.description}</p>
        </div>

        <div className="sport-meta">
          <p>
            <strong>Venue</strong>
            {sport.venue}
          </p>

          <p>
            <strong>Players</strong>
            {sport.playersPerTeam} per team
          </p>

          <p>
            <strong>Level</strong>
            {sport.difficulty}
          </p>
        </div>
      </div>

      <div className="slots-section">
        <h3>Available Slots</h3>

        <div className="slots-list">
          {sport.slots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              onBookSlot={onBookSlot}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SportDetails;