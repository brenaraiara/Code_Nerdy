import { useState } from "react";
import { FaStar, FaTrashAlt } from "react-icons/fa";

export default function MyPersonalAnimeList() {
  const [animes, setAnimes] = useState<{ name: string, genre: string, year: string, season: string, rating: number }[]>([]);
  const [newAnime, setNewAnime] = useState<string>("");
  const [newGenre, setNewGenre] = useState<string>("");
  const [newYear, setNewYear] = useState<string>("");
  const [newSeason, setNewSeason] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const addAnime = () => {
    if (newAnime.trim() === "" || newGenre.trim() === "" || newYear.trim() === "" || newSeason.trim() === "") return;
    const anime = { name: newAnime, genre: newGenre, year: newYear, season: newSeason, rating: rating };

    if (editIndex !== null) {
      const updatedAnimes = [...animes];
      updatedAnimes[editIndex] = anime;
      setAnimes(updatedAnimes);
      setEditIndex(null);
    } else {
      setAnimes([...animes, anime]);
    }
    setNewAnime("");
    setNewGenre("");
    setNewYear("");
    setNewSeason("");
    setRating(1);
  };

  const editAnime = (index: number) => {
    const anime = animes[index];
    setNewAnime(anime.name);
    setNewGenre(anime.genre);
    setNewYear(anime.year);
    setNewSeason(anime.season);
    setRating(anime.rating);
    setEditIndex(index);
    setShowDelete(true); // Show delete option
  };

  const deleteAnime = () => {
    if (editIndex !== null) {
      setAnimes(animes.filter((_, i) => i !== editIndex));
      setEditIndex(null);
    }
    setShowDelete(false); // Hide delete option after action
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        My Personal Anime List
      </h1>

      <div>
        <input
          type="text"
          value={newAnime}
          onChange={(e) => setNewAnime(e.target.value)}
          placeholder="Anime Name"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "500px",
            marginBottom: "0.5rem",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        />
        <select
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "500px",
            marginBottom: "0.5rem",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <option value="Horror">Horror</option>
          <option value="Romance">Romance</option>
          <option value="Isekai">Isekai</option>
          <option value="Comedy">Comedy</option>
          <option value="Mystery">Mystery</option>
          <option value="Boys Love">Boys Love</option>
          <option value="Sports">Sports</option>
          <option value="Yuri">Yuri</option>
          <option value="Drama">Drama</option>
        </select>
        <input
          type="number"
          value={newYear}
          onChange={(e) => setNewYear(e.target.value)}
          placeholder="Year"
          min="1990"
          max="2025"
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "500px",
            marginBottom: "0.5rem",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        />
        <select
          value={newSeason}
          onChange={(e) => setNewSeason(e.target.value)}
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "500px",
            marginBottom: "0.5rem",
            boxSizing: "border-box",
            textAlign: "center",
          }}
        >
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
        </select>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1rem",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              width: "auto",
              marginRight: "10px",
              textAlign: "center",
            }}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} {value === 1 ? "star" : "stars"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={addAnime}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          maxWidth: "500px",
          boxSizing: "border-box",
          display: "block",
        }}
      >
        {editIndex !== null ? "Save Changes" : "Add"}
      </button>

      <table
        style={{
          marginTop: "1rem",
          width: "100%",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0",
          boxSizing: "border-box",
          borderCollapse: "collapse",
          tableLayout: "auto",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "left" }}>
              Anime Name
            </th>
            <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "center" }}>
              Genre
            </th>
            <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "center" }}>
              Year
            </th>
            <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "center" }}>
              Season
            </th>
            <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "center" }}>
              Rating
            </th>
            <th style={{ padding: "0.5rem", border: "1px solid #ddd", textAlign: "center" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {animes.map((anime, index) => (
            <tr key={index}>
              <td
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {anime.name}
              </td>
              <td
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {anime.genre}
              </td>
              <td
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {anime.year}
              </td>
              <td
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {anime.season}
              </td>
              <td
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      style={{
                        color: i < anime.rating ? "#FFD700" : "#D3D3D3",
                        fontSize: "1.2rem",
                      }}
                    />
                  ))}
                </div>
              </td>
              <td
                style={{
                  padding: "0.5rem",
                  border: "1px solid #ddd",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <button
                  onClick={() => editAnime(index)}
                  style={{
                    cursor: "pointer",
                    color: "orange",
                    border: "none",
                    background: "none",
                  }}
                >
                  Edit
                </button>
                {showDelete && editIndex === index && (
                  <FaTrashAlt
                    onClick={deleteAnime}
                    style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
