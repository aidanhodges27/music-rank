export default function SongList({ song, action }) {
    return (
        <section id="searchResults">
            {song.map((song) => (
                <article key={song.id} className="song">
                    <h2>{song.title}</h2>
                    <p>{song.artist.name}</p>
                    <button onClick={() => action(song)}>Add to List</button>
                </article>
            ))}
        </section>
    )
}   