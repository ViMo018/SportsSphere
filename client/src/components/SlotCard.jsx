function SlotCard({ slot, onBookSlot }) {
  const isFull = slot.booked >= slot.capacity;

  return (
    <div className="slot-card">
      <div>
        <h4>{slot.time}</h4>
        <p>
          {slot.booked}/{slot.capacity} players booked
        </p>
      </div>

      <button disabled={isFull} onClick={() => onBookSlot(slot.id)}>
        {isFull ? "Full" : "Book Slot"}
      </button>
    </div>
  );
}

export default SlotCard;