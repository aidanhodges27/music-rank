import "./SongList.css";

export default function SongList({ songs, action }) {
    return (
        <section id="searchResults">
            {songs && songs.length > 0 ? (
            songs.map((song) => (
                <article key={song.trackId}>
                    <img src={song.artworkUrl100} alt={song.trackName} />
                    <h2>{song.trackName}</h2>
                    <p>{song.artistName}</p>
                    <button onClick={() => action(song)}>Favorite</button>
                </article>
            ))
           ) : (
                <p>No songs found</p>
            )}
        </section>
    )};