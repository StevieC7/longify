export default function PlaylistItems({playlist}) {
    return(
        <div className="playlist">
            {playlist.map((val, key) => {return(
                val.name ? 
                    <div key={key} className='playlist-song'>
                        <p>{val.name}</p>
                        <p className="song-tag">Song</p>
                        <p>{`${Math.floor(val.duration_ms / 1000 / 60)}:${(val.duration_ms / 1000 / 60) % (val.duration_ms / 1000 / 60)}`}</p>
                    </div>
                : 
                    <p key={key}>{val.episode.name}</p>
            )})}
        </div>
    )
}