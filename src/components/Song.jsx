import { useState } from 'react';
import { login } from '../services/authService';
import {saveFavorite} from '../services/favoritesService';

export default function Song({ song}) {  
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
