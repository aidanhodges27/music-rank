import { useState } from 'react';
import { login } from '../services/authService';
import {saveFavorite} from '../services/favoritesService';

export default function Song({ song, user }) {
    const [favorite, setFavorite] = useState(false);
    const [saving, setSaving] = useState(false);

    async function addFavorite() {
        setSaving(true);
        await saveFavorite(song, user);
        setFavorite(true);
    }

    
    return (
        <section id="song">
            <h2>{song.trackName}</h2>
            <p>{song.artistName}</p>
            <ul>
                {Object.entries(song)
                    .filter(([key, value]) => key.startsWith("track") && value)
                    .map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
            </ul>
            
        </section>
    );
}
