import { useEffect, useState } from "react"
export default function PlaylistSummary({playlist}) {
    const [stats, setStats] = useState({songCount: 0, episodeCount: 0, songLength: 0, episodeLength: 0})
    useEffect(() => {
        playlist.forEach((val) => {
            val.name ? setStats({...stats, songCount: `${stats.songCount++}`}) : setStats({...stats, episodeCount: `${stats.episodeCount++}`})
            val.name ? setStats({...stats, songLength: `${stats.songLength += val.duration_ms}`}) : setStats({...stats, episodeLength: `${stats.episodeLength += val.episode.duration_ms}`})
        })
        // eslint-disable-next-line
    }, [playlist])
    return(
    <div className="playlist-summary">
        <p>{`Songs: ${stats.songCount} (${Math.round(stats.songLength / 1000 / 60)} minutes)`}</p>
        <p>{`Episodes: ${stats.episodeCount} (${Math.round(stats.episodeLength / 1000 / 60)} minutes)`}</p>
    </div>
    )
}