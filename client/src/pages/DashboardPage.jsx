import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import SportsList from "../components/SportsList";
import SportDetails from "../components/SportDetails";

function DashboardPage() {
  const { sportId } = useParams();
  const navigate = useNavigate();

  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchSports() {
    try {
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
      setDetailLoading(true);

      const res = await api.get(`/api/sports/${id}`);
      setSelectedSport(res.data.data);
    } catch (err) {
      setError("Unable to load sport details");
    } finally {
      setDetailLoading(false);
    }
  }

  function handleSelectSport(id) {
    navigate(`/sports/${id}`);
  }

  async function handleBookSlot(slotId) {
    try {
      const res = await api.patch(
        `/api/sports/${selectedSport.id}/slots/${slotId}/book`
      );

      setSelectedSport(res.data.data);

      // update left-side available slot count
      fetchSports();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  }

  useEffect(() => {
    async function loadSports() {
      try {
        setLoading(true);
        await fetchSports();
      } finally {
        setLoading(false);
      }
    }

    loadSports();
  }, []);

  useEffect(() => {
    if (!loading && !sportId && sports.length > 0) {
      navigate(`/sports/${sports[0].id}`, { replace: true });
    }
  }, [loading, sportId, sports, navigate]);

  useEffect(() => {
    if (sportId) {
      fetchSportDetails(sportId);
    }
  }, [sportId]);

  if (loading) {
    return <div className="page-message">Loading SportsSphere...</div>;
  }

  if (error) {
    return <div className="page-message error">{error}</div>;
  }

  return (
    <main className="app">
      <Header sportsCount={sports.length} />

      <section className="dashboard">
        <SportsList
          sports={sports}
          selectedSportId={selectedSport?.id}
          onSelectSport={handleSelectSport}
        />

        <SportDetails
          sport={selectedSport}
          loading={detailLoading}
          onBookSlot={handleBookSlot}
        />
      </section>
    </main>
  );
}

export default DashboardPage;