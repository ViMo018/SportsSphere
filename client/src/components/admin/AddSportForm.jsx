function AddSportForm({
  sportForm,
  onSportFormChange,
  onCreateSport,
  creating,
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-head">
        <div>
          <p className="eyebrow">Sports Management</p>
          <h2>Add New Sport</h2>
        </div>
      </div>

      <form className="admin-form" onSubmit={onCreateSport}>
        <label>
          <span>Slug</span>
          <input
            type="text"
            name="slug"
            value={sportForm.slug}
            onChange={onSportFormChange}
            placeholder="squash"
          />
        </label>

        <label>
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={sportForm.name}
            onChange={onSportFormChange}
            placeholder="Squash"
          />
        </label>

        <label>
          <span>Icon</span>
          <input
            type="text"
            name="icon"
            value={sportForm.icon}
            onChange={onSportFormChange}
            placeholder="🎾"
          />
        </label>

        <label>
          <span>Venue</span>
          <input
            type="text"
            name="venue"
            value={sportForm.venue}
            onChange={onSportFormChange}
            placeholder="Indoor Court 2"
          />
        </label>

        <label>
          <span>Players Per Team</span>
          <input
            type="number"
            name="playersPerTeam"
            value={sportForm.playersPerTeam}
            onChange={onSportFormChange}
            placeholder="1"
          />
        </label>

        <label>
          <span>Difficulty</span>
          <input
            type="text"
            name="difficulty"
            value={sportForm.difficulty}
            onChange={onSportFormChange}
            placeholder="Medium"
          />
        </label>

        <label className="admin-form-wide">
          <span>Description</span>
          <textarea
            name="description"
            value={sportForm.description}
            onChange={onSportFormChange}
            placeholder="Book squash slots for quick indoor matches."
            rows="4"
          />
        </label>

        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create Sport"}
        </button>
      </form>
    </section>
  );
}

export default AddSportForm;