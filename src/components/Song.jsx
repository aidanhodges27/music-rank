import { useState } from 'react';
import { login } from '../services/authService';
import {saveFavorite} from '../services/favoriteService';

export default function Song({ song, user }) {
    const [favorite, setFavorite] = useState(false);

    function addFavorite() {
        saveFavorite(song);
        setFavorite(true);
    }

    return (
        <section id="song">
            <h2>{song.title}</h2>
            <p>{song.artist.name}</p>
            {!user ? (
                <button onClick={login}>Sign In to Add to Favorites</button>
            ) : (
                <button onClick={addFavorite}>Add to Favorites</button>
            )}
        </section>
    )
}