export default function PlaylistItems({playlist}) {
    return(
        <div className="playlist">
            {playlist.map((val, key) => {return(
                val.name ? 
                    <div key={key} className='playlist-item'>
                        <div className="playlist-item-left">
                            <p className="song-tag">Song</p>
                            <p>{val.name}</p>
                        </div>
                            <p>{`${Math.floor(val.duration_ms / 1000 / 60)}:${Math.round(((val.duration_ms / 1000 / 60) % (Math.floor(val.duration_ms / 1000 / 60))) * 60)}`}</p>
                    </div>
                : 
                    <div key={key} className='playlist-item'>
                        <div className="playlist-item-left">
                            <p className="episode-tag">Podcast</p>
                            <img className="episode-img" src={val.episode.images[0].url} alt={val.episode.name}></img>
                            <p>{val.episode.name}</p>
                        </div>
                            <p>{`${Math.floor(val.episode.duration_ms / 1000 / 60)}:${Math.round(((val.episode.duration_ms / 1000 / 60) % (Math.floor(val.episode.duration_ms / 1000 / 60))) * 60)}`}</p>
                    </div>
            )})}
        </div>
    )
}