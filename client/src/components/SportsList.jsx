import SportCard from "./SportCard";

function SportsList({ sports, selectedSportId, onSelectSport }) {
  return (
    <aside className="sports-panel">
      <h2>Choose Sport</h2>

      <div className="sports-list">
        {sports.map((sport) => (
          <SportCard
            key={sport.id}
            sport={sport}
            isActive={selectedSportId === sport.id}
            onClick={() => onSelectSport(sport.id)}
          />
        ))}
      </div>
    </aside>
  );
}

export default SportsList;