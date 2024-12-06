export default function SongList({ songs, action }) {
    return (
        <div>{JSON.stringify(songs, null, 2)}
        </div>
        
    )
}   