import { useState } from "react"
import { Button } from "@mui/material"
export default function PlaylistActions({ playlist, setPlaylist, userConfig }) {
    const [addSuccess, setAddSuccess] = useState(null)
    const [playlistDetails, setPlaylistDetails] = useState(null)
    let playlistID;
    let spotifyURIs = {
        uris: playlist.map((val) => {
            if(val.id) {
                return `spotify:track:${val.id}`
            }
            return `spotify:episode:${val.episode.id}`
        })}
    // function to split the list up until all URI lists would be shorter than 100 items (limit set by Spotify API)
    const arrSpotifyURIs = splitURIs()
    function splitURIs() {
        if (spotifyURIs.uris.length > 0) {
            let arrSpotifyURIs = [spotifyURIs];
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
            return arrSpotifyURIs
        }
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
        setAddSuccess(true)
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
                // build promises with a delay between so that fetch requests happen in order
                const delayIncrement = 500;
                let delay = 500;
                const promiseArray = arrSpotifyURIs.map((val) => {
                    delay += delayIncrement
                    return new Promise(resolve => setTimeout(resolve, delay)).then(() => fetch(`https://api.spotify.com/v1/playlists/${json.id}/tracks`, {
                        method: 'post',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(val)
                        }))
                })
                // resolve the promises from above to post to Spotify, then pull a playlist id out of it for making another request to get the metadata for the playlist link
                Promise.all(promiseArray)
                .then((res) => Promise.all(res.map((val) => {
                    return val.json()
                })))
                .then((json) => {
                    if (json[0].snapshot_id) {
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
                    {
                        playlistDetails !== null ? 
                            <div className="playlist-meta">
                                <a href={playlistDetails.playLink}>
                                    <img src={playlistDetails.cover} alt='playlist cover' className="playlist-cover" />
                                </a>
                                <div>
                                    <p className="playlist-name">{playlistDetails.name}</p>
                                    <Button variant="contained" sx={{margin: '0.5rem 1rem', backgroundColor: '#1DB954', '&:hover': {backgroundColor: '#19B550'}}} href={playlistDetails.playLink}>Open in Spotify</Button>
                                </div>
                            </div> 
                        : 
                            <Button variant="contained" sx={{margin: '1rem', '&:disabled': {backgroundColor: '#1DB954'}}} disabled>Adding to Library</Button>
                    }
                </>
            }
            {addSuccess === false ? <p>An error has occurred. Please reload and try again.</p> : <></>}
        </>
    )
}