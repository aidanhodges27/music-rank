import "./SongList.css";
import { useState } from "react";
import { saveFavorite } from "../services/favoritesService";
import { login } from "../services/authService";

export default function SongList({ songs, user}) {
    const [favorite, setFavorite] = useState(false);
    const [saving, setSaving] = useState(false);

    async function addFavorite(song) {
        setSaving(true);
        await saveFavorite(song, user);
        setFavorite(true);
    }

    return (
        <section id="searchResults">
            {songs && songs.length > 0 ? (
            songs.map((song) => (
                <article key={song.trackId}>
                    <img src={song.artworkUrl100} alt={song.trackName} />
                    <h2>{song.trackName}</h2>
                    <p>{song.artistName}</p>
                    {!user ? (
                        <button onClick={login}>Login to save</button>
                        ) : favorite ? (
                            <button disabled>Saved!</button>
                        ) : saving ? (
                            <button disabled>...</button>
                        ) : (
                            <button onClick={addFavorite(song)}>Favorite</button>
                        )}              
                </article>
            ))
           ) : (
                <p>No songs found</p>
            )}
        </section>
    )};