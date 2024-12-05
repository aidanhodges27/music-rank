import { useState } from 'react';
import { login } from '../services/authService';
import {saveFavorite} from '../services/favoriteService';

export default function Song({ song, user }) {
    const [favorite, setFavorite] = useState(false);
    const [saving, setSaving] = useState(false);

    function addFavorite() {
        saveFavorite(song);
        setFavorite(true);
    }

    return (
        <section id="song">
            <h2>{song.strSong}</h2>
            <p>{song.strArtost}</p>
            <ul>
                {Object.entries(song)
                    .filter(([key, value]) => key.startsWith("str") && value)
                    .map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
            </ul>
            {!user ? (
                <button onClick={login}>Sign In to Add to Favorites</button>
            ) : saved ? (
                <button disabled>Added to Favorites!</button>
            ) : saving ? (
                <button disabled>...</button>
            ) : (
                <button onClick={addFavorite}>Add to <Favorites></Favorites></button>
            )}
        </section>
    );
}