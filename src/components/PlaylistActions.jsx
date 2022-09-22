import { useState } from "react"
import { Button } from "@mui/material"
export default function PlaylistActions({ playlist, setPlaylist, userConfig }) {
    const [addSuccess, setAddSuccess] = useState(null)
    const [playlistDetails, setPlaylistDetails] = useState({})
    let playlistID;
    let spotifyURIs = {
        uris: playlist.map((val) => {
            if(val.id) {
                return `spotify:track:${val.id}`
            }
            return `spotify:episode:${val.episode.id}`
        })}
    // add function to split the list up until all URI lists would be shorter than 100 items (limit set by Spotify API)
    if (spotifyURIs.uris.length > 0) {
        let arrSpotifyURIs = [spotifyURIs, spotifyURIs];
        console.log(arrSpotifyURIs)
        let i = 0;
        while (arrSpotifyURIs[i].uris.length > 100 && arrSpotifyURIs[i].uris.length) {
            // below creates new object containing the excess
            arrSpotifyURIs.push({uris: arrSpotifyURIs[i].uris.slice(100)})
            // iterate to the new array and do it again
            i++
        }
        // below splices only the first 100 in place in any spot where there are more than 100 (these were previously sliced and had the excess pushed to the end of the array)
        let j = 0;
        while (arrSpotifyURIs[j].uris.length > 100 && arrSpotifyURIs[j].uris.length) {
            arrSpotifyURIs[j] = {uris: arrSpotifyURIs[j].uris.slice(0,100)}
            j++
        }
        console.log(arrSpotifyURIs)
    }
    const getSongMixInfo = (num) => {
        if (num === 50) {
            return 'even mix'
        }
        if (num > 50 && num < 70) {
            return 'more music'
        }
        if (num >= 70) {
            return 'mostly music'
        }
        if (num < 50 && num > 30) {
            return 'more podcasts'
        }
        if (num <= 30) {
            return 'mostly podcasts'
        }
    }
    let playlistMeta = {
        name: `Longify: ${userConfig.playLength} hours, ${getSongMixInfo(userConfig.songMix)}`,
        description: 'Playlist created using Longify' 
    }
    const handleAdd = () => {
        // get user ID so we can do stuff with it
        fetch('https://api.spotify.com/v1/me', {headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json'
        }})
        .then((res) => res.json())
        // chain a new request using data from that one to create a playlist
        .then((json) => {
            fetch(`https://api.spotify.com/v1/users/${json.id}/playlists`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlistMeta)
            })
            .then((res) => res.json())
            .then((json) => {
                playlistID = json.id
                fetch(`https://api.spotify.com/v1/playlists/${json.id}/tracks`, {
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(spotifyURIs)
                })
                .then((res) => res.json())
                .then((json) => {
                    if (json.snapshot_id) {
                        setAddSuccess(true)
                        fetch(`https://api.spotify.com/v1/playlists/${playlistID}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                                'Content-Type': 'application/json'
                            }
                        })
                        .then((res) => res.json())
                        .then((json) => setPlaylistDetails({cover: `${json.images[0].url}`, playLink: `${json.external_urls.spotify}`, name: `${json.name}`}))
                    }
                })
                .catch(() => {
                    setAddSuccess(false)
                })
            })
        })
    }
    return(
        <>
            {
                addSuccess === null && addSuccess !== false ? 
                <Button variant="contained" sx={{margin: '1rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#1DB954'}}} onClick={() => handleAdd()}>Add to Library</Button>
                :
                <>
                <div className="playlist-meta">
                    {
                        playlistDetails ? 
                            <>
                            <a href={playlistDetails.playLink}>
                                <img src={playlistDetails.cover} alt='playlist cover' className="playlist-cover" />
                            </a>
                            <p className="playlist-name">{playlistDetails.name}</p>
                            </> 
                        : 
                            <Button variant="contained" sx={{margin: '1rem', backgroundColor: '#1DB954'}} disabled>Added to Library</Button>
                    }
                </div>
                </>
            }
        </>
    )
}