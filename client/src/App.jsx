import { useEffect, useState } from "react";
import api from "./services/api";
import Header from "./components/Header";
import SportsList from "./components/SportsList";
import SportDetails from "./components/SportDetails";
import "./App.css";

function App() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

async function fetchSports(shouldSelectFirstSport = false) {
  try {
    const res = await api.get("/api/sports");
    const sportsData = res.data.data;

    setSports(sportsData);

    if (shouldSelectFirstSport && sportsData.length > 0) {
      fetchSportDetails(sportsData[0].id);
    }
  } catch (err) {
    setError("Unable to load sports data");
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

async function handleBookSlot(slotId) {
  try {
    const res = await api.patch(
      `/api/sports/${selectedSport.id}/slots/${slotId}/book`
    );

    setSelectedSport(res.data.data);

    // update left side sports count, but do not jump back to cricket
    fetchSports(false);
  } catch (err) {
    alert(err.response?.data?.message || "Booking failed");
  }
}

useEffect(() => {
  async function loadInitialData() {
    try {
      setLoading(true);
      await fetchSports(true);
    } finally {
      setLoading(false);
    }
  }

  loadInitialData();
}, []);

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
          onSelectSport={fetchSportDetails}
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

export default App;