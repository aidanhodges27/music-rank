import { useEffect, useState } from "react"
import { useAuthentication } from "../services/authService"
import Search from "./Search"
import "./App.css"
import { fetchItunesData, fetchItunesById, fetchNameandArtist, fetchNameAndUrl } from "../services/searchService"
import SongList from "./SongList"
import Header from "./Header"
import { fetchFavorites } from "../services/favoritesService"

export default function App() {
  const user = useAuthentication()
  const [searchTerm, setSearchTerm] = useState("")
  const [songs, setSongs] = useState([]);
  const [songId, setSongId] = useState(null);
  const [song, setSong] = useState(null);
  const [showingFavorites, setShowingFavorites] = useState(false);

  useEffect(() => {
    setSong(null);
    fetchItunesData(searchTerm).then(setSongs);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm("");
    if (songId) fetchItunesById(songId).then(setSong);
  }, [songId]);

  function startOver() {
    setShowingFavorites(false);
    setSongs([]);
    setSong(null);
    setSearchTerm("");
  }

  function handleSearch(term) {
    setSearchTerm(term);
    setShowingFavorites(false);
  }

  async function showFavorites() {
    setShowingFavorites(true);
    const songs = await fetchFavorites();
      for (let r of songs) {
        const [name, artist, thumb] = await fetchNameAndUrl(r.track_id);
        if (name && artist && thumb) {
          r.artworkUrl100 = thumb;
          r.trackName = name;
          r.artistName = artist;
        } else { 
          console.warn('No results for track_id: ${r.track_id}');
        }
      }
      setSongs(songs);
      };
    

  return (
    <div className="App">
      <Header action={startOver} user={user}></Header>
      <button className='favorite' onClick={showFavorites}>Favorites</button>
      <Search action={handleSearch}/>
      <SongList 
      songs={songs || []} 
      action={(id) => setSongId(id)} 
      user={user} 
      showingFavorites={showingFavorites}/>
    </div>
  )
  }