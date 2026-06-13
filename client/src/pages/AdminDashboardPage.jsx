import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [creating, setCreating] = useState(false);
  const [addingSlot, setAddingSlot] = useState(false);

  const [sportForm, setSportForm] = useState({
    slug: "",
    name: "",
    icon: "",
    venue: "",
    playersPerTeam: "",
    difficulty: "",
    description: "",
  });

  const [slotForm, setSlotForm] = useState({
    sportSlug: "",
    slotId: "",
    time: "",
    capacity: "",
  });

  async function fetchAdminStats() {
    const res = await api.get("/api/admin/stats");
    setStats(res.data.data);
  }

  async function fetchSports() {
    const res = await api.get("/api/sports");
    const sportsData = res.data.data;

    setSports(sportsData);

    setSlotForm((prevForm) => {
      return {
        ...prevForm,
        sportSlug: prevForm.sportSlug || sportsData[0]?.id || "",
      };
    });
  }

  async function fetchAdminData() {
    try {
      setLoading(true);

      await fetchAdminStats();
      await fetchSports();
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to load admin dashboard",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSportFormChange(event) {
    const { name, value } = event.target;

    setSportForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }

  function handleSlotFormChange(event) {
    const { name, value } = event.target;

    setSlotForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }

  async function handleCreateSport(event) {
    event.preventDefault();

    try {
      setCreating(true);

      const payload = {
        ...sportForm,
        playersPerTeam: Number(sportForm.playersPerTeam),
      };

      const res = await api.post("/api/admin/sports", payload);

      setToast({
        type: "success",
        message: res.data.message || "Sport created successfully",
      });

      setSportForm({
        slug: "",
        name: "",
        icon: "",
        venue: "",
        playersPerTeam: "",
        difficulty: "",
        description: "",
      });

      await fetchAdminData();
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to create sport",
      });
    } finally {
      setCreating(false);
    }
  }

  async function handleAddSlot(event) {
    event.preventDefault();

    try {
      setAddingSlot(true);

      const payload = {
        slotId: slotForm.slotId,
        time: slotForm.time,
        capacity: Number(slotForm.capacity),
      };

      const res = await api.post(
        `/api/admin/sports/${slotForm.sportSlug}/slots`,
        payload
      );

      setToast({
        type: "success",
        message: res.data.message || "Slot added successfully",
      });

      setSlotForm((prevForm) => {
        return {
          ...prevForm,
          slotId: "",
          time: "",
          capacity: "",
        };
      });

      await fetchSports();
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to add slot",
      });
    } finally {
      setAddingSlot(false);
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Navbar />

      <main className="app">
        <section className="page-head">
          <div>
            <p className="eyebrow">Admin Control</p>
            <h1>Dashboard</h1>
            <p>
              Monitor SportsSphere activity, bookings, users, sports, and slots
              from one place.
            </p>
          </div>

          <Link to="/sports/cricket" className="page-action">
            Back to sports
          </Link>
        </section>

        {loading ? (
          <div className="panel-message">Loading admin dashboard...</div>
        ) : !stats ? (
          <section className="empty-panel">
            <h2>Admin access required</h2>
            <p>
              You need to be logged in as an admin to view this dashboard.
            </p>
            <Link to="/login">Login</Link>
          </section>
        ) : (
          <>
            <section className="stats-grid">
              <article className="stat-card">
                <span>Total Users</span>
                <strong>{stats.totalUsers}</strong>
              </article>

              <article className="stat-card">
                <span>Total Sports</span>
                <strong>{stats.totalSports}</strong>
              </article>

              <article className="stat-card">
                <span>Total Bookings</span>
                <strong>{stats.totalBookings}</strong>
              </article>

              <article className="stat-card">
                <span>Active Bookings</span>
                <strong>{stats.activeBookings}</strong>
              </article>

              <article className="stat-card">
                <span>Cancelled Bookings</span>
                <strong>{stats.cancelledBookings}</strong>
              </article>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <p className="eyebrow">Sports Management</p>
                  <h2>Add New Sport</h2>
                </div>
              </div>

              <form className="admin-form" onSubmit={handleCreateSport}>
                <label>
                  <span>Slug</span>
                  <input
                    type="text"
                    name="slug"
                    value={sportForm.slug}
                    onChange={handleSportFormChange}
                    placeholder="squash"
                  />
                </label>

                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    value={sportForm.name}
                    onChange={handleSportFormChange}
                    placeholder="Squash"
                  />
                </label>

                <label>
                  <span>Icon</span>
                  <input
                    type="text"
                    name="icon"
                    value={sportForm.icon}
                    onChange={handleSportFormChange}
                    placeholder="🎾"
                  />
                </label>

                <label>
                  <span>Venue</span>
                  <input
                    type="text"
                    name="venue"
                    value={sportForm.venue}
                    onChange={handleSportFormChange}
                    placeholder="Indoor Court 2"
                  />
                </label>

                <label>
                  <span>Players Per Team</span>
                  <input
                    type="number"
                    name="playersPerTeam"
                    value={sportForm.playersPerTeam}
                    onChange={handleSportFormChange}
                    placeholder="1"
                  />
                </label>

                <label>
                  <span>Difficulty</span>
                  <input
                    type="text"
                    name="difficulty"
                    value={sportForm.difficulty}
                    onChange={handleSportFormChange}
                    placeholder="Medium"
                  />
                </label>

                <label className="admin-form-wide">
                  <span>Description</span>
                  <textarea
                    name="description"
                    value={sportForm.description}
                    onChange={handleSportFormChange}
                    placeholder="Book squash slots for quick indoor matches."
                    rows="4"
                  />
                </label>

                <button type="submit" disabled={creating}>
                  {creating ? "Creating..." : "Create Sport"}
                </button>
              </form>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <p className="eyebrow">Slot Management</p>
                  <h2>Add Slot to Sport</h2>
                </div>
              </div>

              <form className="admin-form" onSubmit={handleAddSlot}>
                <label>
                  <span>Sport</span>
                  <select
                    name="sportSlug"
                    value={slotForm.sportSlug}
                    onChange={handleSlotFormChange}
                  >
                    {sports.map((sport) => (
                      <option key={sport.id} value={sport.id}>
                        {sport.name}
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
                    onChange={handleSlotFormChange}
                    placeholder="c5"
                  />
                </label>

                <label>
                  <span>Time</span>
                  <input
                    type="text"
                    name="time"
                    value={slotForm.time}
                    onChange={handleSlotFormChange}
                    placeholder="8:00 PM - 9:30 PM"
                  />
                </label>

                <label>
                  <span>Capacity</span>
                  <input
                    type="number"
                    name="capacity"
                    value={slotForm.capacity}
                    onChange={handleSlotFormChange}
                    placeholder="22"
                  />
                </label>

                <button type="submit" disabled={addingSlot}>
                  {addingSlot ? "Adding..." : "Add Slot"}
                </button>
              </form>

              <div className="admin-sports-list">
                {sports.map((sport) => (
                  <article key={sport.id} className="admin-sport-row">
                    <div>
                      <strong>
                        {sport.icon} {sport.name}
                      </strong>
                      <span>{sport.venue}</span>
                    </div>

                    <Link to={`/sports/${sport.id}`}>
                      {sport.totalSlots} slots
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default AdminDashboardPage;