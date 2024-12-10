import "./SongList.css";
import { useState } from "react";
import { saveFavorite } from "../services/favoritesService";
import { login } from "../services/authService";

export default function SongList({ songs, user, showingFavorites }) {
    const [favorites, setFavorites] = useState(false);
    const [saving, setSaving] = useState(false);

    async function addFavorite(song) {
        const { trackId } = song;
        setSaving((prev) => ({ ...prev, [trackId]: true }));

        try {
            await saveFavorite(song, user);
            setFavorites((prev) => ({ ...prev, [trackId]: true }));
        } finally {
            setSaving((prev) => ({ ...prev, [trackId]: false }));
        }
    }

    return (
        <section id="searchResults">
            {songs && songs.length > 0 ? (
            songs.map((song) => {
                const { trackId, artworkUrl100, trackName, artistName } = song;
                const isFavorite = favorites[trackId];
                const isSaving = saving[trackId];

                return (
                <article key={trackId}>
                    <img src={artworkUrl100} alt={trackName} />
                    <h2>{trackName}</h2>
                    <p>{artistName}</p> 
                    {!showingFavorites && (
                        <div>
                        {!user ? (
                            <button onClick={login}>Login to save</button>
                            ) : isFavorite ? (
                                <button disabled>Saved!</button>
                            ) : isSaving ? (
                                <button disabled>...</button>
                            ) : (
                                <button onClick={() => addFavorite(song)}>Favorite</button>
                            )}   
                        </div>
                    )}        
                </article>
            );
        })
           ) : (
                <p>No songs found</p>
            )}
        </section>
    )};