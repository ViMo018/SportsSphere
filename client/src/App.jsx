import { useEffect, useState } from "react";
import api from "./services/api";
import "./App.css";

function App() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchSports() {
    try {
      setLoading(true);
      const res = await api.get("/api/sports");
      setSports(res.data.data);

      if (res.data.data.length > 0) {
        fetchSportDetails(res.data.data[0].id);
      }
    } catch (err) {
      setError("Unable to load sports data");
    } finally {
      setLoading(false);
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
      fetchSports();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  }

  useEffect(() => {
    fetchSports();
  }, []);

  if (loading) {
    return <div className="page-message">Loading SportsSphere...</div>;
  }

  if (error) {
    return <div className="page-message error">{error}</div>;
  }

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">IIITA Sports Booking</p>
          <h1>SportsSphere</h1>
          <p>
            Browse sports, check available slots, and book your game without
            fighting in ten WhatsApp groups.
          </p>
        </div>

        <div className="hero-card">
          <span>{sports.length}</span>
          <p>sports available</p>
        </div>
      </section>

      <section className="dashboard">
        <aside className="sports-panel">
          <h2>Choose Sport</h2>

          <div className="sports-list">
            {sports.map((sport) => (
              <button
                key={sport.id}
                className={
                  selectedSport?.id === sport.id
                    ? "sport-card active"
                    : "sport-card"
                }
                onClick={() => fetchSportDetails(sport.id)}
              >
                <span className="sport-icon">{sport.icon}</span>

                <div>
                  <h3>{sport.name}</h3>
                  <p>{sport.venue}</p>
                </div>

                <small>
                  {sport.availableSlots}/{sport.totalSlots} free
                </small>
              </button>
            ))}
          </div>
        </aside>

        <section className="details-panel">
          {detailLoading || !selectedSport ? (
            <div className="empty-state">Loading sport details...</div>
          ) : (
            <>
              <div className="sport-header">
                <div>
                  <span className="big-icon">{selectedSport.icon}</span>
                  <h2>{selectedSport.name}</h2>
                  <p>{selectedSport.description}</p>
                </div>

                <div className="sport-meta">
                  <p>
                    <strong>Venue</strong>
                    {selectedSport.venue}
                  </p>
                  <p>
                    <strong>Players</strong>
                    {selectedSport.playersPerTeam} per team
                  </p>
                  <p>
                    <strong>Level</strong>
                    {selectedSport.difficulty}
                  </p>
                </div>
              </div>

              <div className="slots-section">
                <h3>Available Slots</h3>

                <div className="slots-list">
                  {selectedSport.slots.map((slot) => {
                    const isFull = slot.booked >= slot.capacity;

                    return (
                      <div key={slot.id} className="slot-card">
                        <div>
                          <h4>{slot.time}</h4>
                          <p>
                            {slot.booked}/{slot.capacity} players booked
                          </p>
                        </div>

                        <button
                          disabled={isFull}
                          onClick={() => handleBookSlot(slot.id)}
                        >
                          {isFull ? "Full" : "Book Slot"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

export default App;