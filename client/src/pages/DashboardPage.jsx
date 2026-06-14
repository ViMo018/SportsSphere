import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import SportsList from "../components/SportsList";
import SportDetails from "../components/SportDetails";
import Toast from "../components/Toast";
import Navbar from "../components/Navbar";

function DashboardPage() {
  const { sportId } = useParams();
  const navigate = useNavigate();

  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [bookingSlotId, setBookingSlotId] = useState(null);

  async function fetchSports() {
    try {
      setError("");

      const res = await api.get("/api/sports");
      const sportsData = res.data.data;

      setSports(sportsData);
      return sportsData;
    } catch (err) {
      setError("Unable to load sports data");
      return [];
    }
  }

  async function fetchSportDetails(id) {
    try {
      setError("");
      setDetailLoading(true);

      const res = await api.get(`/api/sports/${id}`);

      setSelectedSport(res.data.data);
    } catch (err) {
      setSelectedSport(null);

      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to load sport details",
      });
    } finally {
      setDetailLoading(false);
    }
  }

  function handleSelectSport(id) {
    navigate(`/sports/${id}`);
  }

  async function handleBookSlot(slotId) {
    if (!selectedSport) {
      return;
    }

    try {
      setBookingSlotId(slotId);

      const res = await api.patch(
        `/api/sports/${selectedSport.id}/slots/${slotId}/book`
      );

      setSelectedSport(res.data.data);

      setToast({
        type: "success",
        message: res.data.message || "Slot booked successfully",
      });
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to book slot",
      });
    } finally {
      setBookingSlotId(null);
    }
  }

  useEffect(() => {
    async function loadSports() {
      try {
        setLoading(true);

        const sportsData = await fetchSports();

        if (!sportId && sportsData.length > 0) {
          navigate(`/sports/${sportsData[0].id}`, { replace: true });
        }
      } finally {
        setLoading(false);
      }
    }

    loadSports();
  }, []);

  useEffect(() => {
    if (sportId) {
      fetchSportDetails(sportId);
    }
  }, [sportId]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  if (loading) {
    return <div className="page-message">Loading SportsSphere...</div>;
  }

  if (error) {
    return <div className="page-message error">{error}</div>;
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <Navbar />

      <main className="app">
        <Header sportsCount={sports.length} />

        <section className="dashboard">
          <SportsList
            sports={sports}
            selectedSportId={selectedSport?.id || sportId}
            onSelectSport={handleSelectSport}
          />

          {detailLoading ? (
            <div className="panel-message">Loading sport details...</div>
          ) : (
            <SportDetails
              sport={selectedSport}
              onBookSlot={handleBookSlot}
              bookingSlotId={bookingSlotId}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default DashboardPage;