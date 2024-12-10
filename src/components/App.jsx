import { useEffect, useState } from "react"
import { useAuthentication } from "../services/authService"
import Search from "./Search"
import "./App.css"
import { fetchItunesData, fetchItunesById, fetchNameandArtist } from "../services/searchService"
import SongList from "./SongList"
import Header from "./Header"
import Song from "./Song"
import { fetchFavorites } from "../services/favoritesService"

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
    if (songId) fetchItunesById(songId).then(setSong);
  }, [songId]);

  function startOver() {
    setSongs(null);
    setSong(null);
    setSearchTerm("");
    setSongId([]);
  }

  async function showFavorites() {
    fetchFavorites().then(async (songs) => {
      for (let r of songs) {
        let [name, artist, thumb] = await fetchNameandArtist(r.id);
        r.artworkUrl100 = thumb;
        r.trackName = name;
        r.artistName = artist;
      }
      setSongs(songs);
      });
    }

  return (
    <div className="App">
      <Header action={startOver} user={user}></Header>
      <button className='favorite' onClick={showFavorites}>Favorites</button>
      <Search action={setSearchTerm}/>
      {song ? (
        <Song song={song} user={user} />
      ) : (
        <SongList songs={songs || []} action={(id) => setSongId(id)} user={user} />
      )}   
    </div>
  )
}