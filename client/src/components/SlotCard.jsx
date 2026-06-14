function SlotCard({ slot, onBookSlot, booking }) {
  const isFull = slot.booked >= slot.capacity;
  const remaining = slot.capacity - slot.booked;
  const fillPercentage = Math.min((slot.booked / slot.capacity) * 100, 100);

  return (
    <article className={isFull ? "slot-card slot-card-full" : "slot-card"}>
      <div className="slot-card-top">
        <div>
          <p className="slot-time">{slot.time}</p>
          <span>{remaining} spots left</span>
        </div>

        <strong>
          {slot.booked}/{slot.capacity}
        </strong>
      </div>

      <div className="slot-progress">
        <div style={{ width: `${fillPercentage}%` }} />
      </div>

      <button
        type="button"
        onClick={() => onBookSlot(slot.id)}
        disabled={isFull || booking}
      >
        {booking ? "Booking..." : isFull ? "Slot Full" : "Book Slot"}
      </button>
    </article>
  );
}

export default SlotCard;