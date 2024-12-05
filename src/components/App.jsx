import { useEffect, useState } from "react"
import { useAuthentication } from "../services/authService"
import Search from "./Search"
import "./App.css"
import { fetchItunesData, fetchItunesById, fetchNameandArtist } from "../services/searchService"
import SongList from "./SongList"
import Header from "./Header"

export default function App() {
  const user = useAuthentication()
  const [searchTerm, setSearchTerm] = useState("")
  const [songs, setSongs] = useState([]);
  const [songId, setSongId] = useState(null);
  const [song, setSong] = useState(null);

  useEffect(() => {
    setSong(null);
    fetchItunesData(searchTerm).then(setSongs);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm("");
    if (songId) {
      fetchItunesById(songId).then(setSong);
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
      <Header action={startOver} user={user}></Header>
        <button onClick={showFavorites}>Favorites</button>
        <Search action={setSearchTerm}/>
        {song ? (
          <Song song={song} user={user} />
        ) : (
          <SongList song={songs} action={setSongId} />
        )}
        
    </div>
  )
}