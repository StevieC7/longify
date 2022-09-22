export default function PlaylistItems({playlist}) {
    function formatDuration (ms) {
        let totalSeconds = ms / 1000;
        console.log('initial totalSeconds:',totalSeconds)
        let totalMinutes = totalSeconds / 60;
        console.log('initial totalMinutes:',totalMinutes)
        let totalHours = totalMinutes / 60;
        console.log('initial totalHours:', totalHours)
        totalHours = Math.floor(totalHours)
        totalMinutes = Math.floor(totalMinutes - (Math.floor(totalHours) * 60))
        totalSeconds = Math.floor(totalSeconds - (totalMinutes * 60) - (totalHours * 60 * 60))
        return `${totalHours >= 10 ? totalHours : `0${totalHours}`}:${totalMinutes >= 10 ? totalMinutes : `0${totalMinutes}`}:${totalSeconds >= 10 ? totalSeconds : `0${totalSeconds}`}`

    }
    return(
        <div className="playlist">
            {playlist.map((val, key) => {return(
                val.name ? 
                    <div key={key} className='playlist-item'>
                        <div className="playlist-item-left">
                            <p className="song-tag">Song</p>
                            <p>{val.name}</p>
                        </div>
                            <p>{formatDuration(val.duration_ms)}</p>
                    </div>
                : 
                    <div key={key} className='playlist-item'>
                        <div className="playlist-item-left">
                            <p className="episode-tag">Podcast</p>
                            <img className="episode-img" src={val.episode.images[0].url} alt={val.episode.name}></img>
                            <p>{val.episode.name}</p>
                        </div>
                            <p>{formatDuration(val.episode.duration_ms)}</p>
                    </div>
            )})}
        </div>
    )
}