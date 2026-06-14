import { Link } from "react-router-dom";

function AddSlotForm({
  sports,
  slotForm,
  onSlotFormChange,
  onAddSlot,
  addingSlot,
  onToggleSportStatus,
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="eyebrow">Slot Management</p>
          <h2>Add Slot to Sport</h2>
        </div>
      </div>

      <form className="admin-form" onSubmit={onAddSlot}>
        <label>
          <span>Sport</span>
          <select
            name="sportSlug"
            value={slotForm.sportSlug}
            onChange={onSlotFormChange}
          >
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name} {sport.isActive ? "" : "(Inactive)"}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Slot ID</span>
          <input
            type="text"
            name="slotId"
            value={slotForm.slotId}
            onChange={onSlotFormChange}
            placeholder="c5"
          />
        </label>

        <label>
          <span>Time</span>
          <input
            type="text"
            name="time"
            value={slotForm.time}
            onChange={onSlotFormChange}
            placeholder="8:00 PM - 9:30 PM"
          />
        </label>

        <label>
          <span>Capacity</span>
          <input
            type="number"
            name="capacity"
            value={slotForm.capacity}
            onChange={onSlotFormChange}
            placeholder="22"
          />
        </label>

        <button type="submit" disabled={addingSlot}>
          {addingSlot ? "Adding..." : "Add Slot"}
        </button>
      </form>

      <div className="admin-sports-list">
        {sports.map((sport) => (
          <article
            key={sport.id}
            className={
              sport.isActive
                ? "admin-sport-row"
                : "admin-sport-row admin-sport-row-inactive"
            }
          >
            <div>
              <strong>
                {sport.icon} {sport.name}
              </strong>

              <span>{sport.venue}</span>

              <small>{sport.isActive ? "Active" : "Inactive"}</small>
            </div>

            <div className="admin-sport-actions">
              <Link to={`/sports/${sport.id}`}>{sport.totalSlots} slots</Link>

              <button
                type="button"
                onClick={() =>
                  onToggleSportStatus(sport.id, !sport.isActive)
                }
              >
                {sport.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AddSlotForm;