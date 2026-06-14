import SlotCard from "./SlotCard";

function SportDetails({ sport, onBookSlot, bookingSlotId }) {
  if (!sport) {
    return (
      <section className="sport-empty">
        <h2>Select a sport</h2>
        <p>Choose a sport from the list to view available slots.</p>
      </section>
    );
  }

  return (
    <section className="sport-details">
      <div className="sport-details-head">
        <div>
          <p className="eyebrow">Selected sport</p>
          <h2>
            <span>{sport.icon}</span> {sport.name}
          </h2>
          <p>{sport.description}</p>
        </div>

        <div className="sport-meta-card">
          <span>Venue</span>
          <strong>{sport.venue}</strong>
        </div>
      </div>

      <div className="sport-info-grid">
        <div>
          <span>Players / Team</span>
          <strong>{sport.playersPerTeam}</strong>
        </div>

        <div>
          <span>Difficulty</span>
          <strong>{sport.difficulty}</strong>
        </div>

        <div>
          <span>Total Slots</span>
          <strong>{sport.slots.length}</strong>
        </div>
      </div>

      <div className="slots-section-head">
        <div>
          <p className="eyebrow">Available timings</p>
          <h3>Book a slot</h3>
        </div>
      </div>

      {sport.slots.length === 0 ? (
        <div className="empty-panel">
          <h2>No slots added yet</h2>
          <p>
            This sport is available, but the admin has not added booking slots
            yet.
          </p>
        </div>
      ) : (
        <div className="slots-grid">
          {sport.slots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              onBookSlot={onBookSlot}
              booking={bookingSlotId === slot.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SportDetails;