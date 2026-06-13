import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import AdminStats from "../components/admin/AdminStats";
import AddSportForm from "../components/admin/AddSportForm";
import AddSlotForm from "../components/admin/AddSlotForm";
import AdminBookingsList from "../components/admin/AdminBookingsList";

function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [sports, setSports] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
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

  async function fetchAdminBookings() {
    const res = await api.get("/api/admin/bookings");
    setAdminBookings(res.data.data);
  }

  async function fetchAdminData() {
    try {
      setLoading(true);

      await fetchAdminStats();
      await fetchSports();
      await fetchAdminBookings();
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
            <AdminStats stats={stats} />

            <AddSportForm
              sportForm={sportForm}
              onSportFormChange={handleSportFormChange}
              onCreateSport={handleCreateSport}
              creating={creating}
            />

            <AddSlotForm
              sports={sports}
              slotForm={slotForm}
              onSlotFormChange={handleSlotFormChange}
              onAddSlot={handleAddSlot}
              addingSlot={addingSlot}
            />

            <AdminBookingsList adminBookings={adminBookings} />
          </>
        )}
      </main>
    </>
  );
}

export default AdminDashboardPage;