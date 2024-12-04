import { useEffect, useState } from "react"
import { SignIn, SignOut } from "./Auth"
import { useAuthentication } from "../services/authService"
import Search from "./Search"
import "./App.css"
import { fetchNameandArtist, fetchDeezerData, fetchDeezerById } from "../services/DeezerSearch"

export default function App() {
  const user = useAuthentication()
  const [searchTerm, setSearchTerm] = useState("")
  const [songs, setSongs] = useState([]);
  const [songId, setSongId] = useState(null);
  const [song, setSong] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setSong(null);
    fetchDeezerData(searchTerm).then(setSongs);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm("");
    if (songId) {
      fetchDeezerData(songId).then(setSong);
    }
  }, [songId]);

  function startOver() {
    setRecipeId(null);
    setRecipe(null);
    setSearchTerm("");
    setRecipes([]);
  }

  async function showFavorites() {
    setSongId(null);
    setSong([]);
    setSongs([]);
    setSearchTerm("");
    fetchFavorites().then(async (songs) => {
      for (let r of songs) {
        let [name, artist] = await fetchNameandArtist(r.id);
        r.strArtist = artist;
        r.strSong = name;
      }
      setSongs(songs);
      });
    }

  return (
    <div className="App">
      <header>
        Music Rank
      </header>
      <main>
        <div className = "Ranking">
          <button>Ranking</button>
        </div>
        <div className="auth">
          {user ? <SignOut /> : <SignIn />}
        </div>
        <div className="Search">
          <Search />
        </div>
        
      </main>
    </div>
  )
}