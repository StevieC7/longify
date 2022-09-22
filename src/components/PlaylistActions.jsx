import { useState } from "react"
import { Button } from "@mui/material"
export default function PlaylistActions({ playlist, setPlaylist, userConfig }) {
    const [addSuccess, setAddSuccess] = useState(null)
    let spotifyURIs = {
        uris: playlist.map((val) => {
            if(val.id) {
                return `spotify:track:${val.id}`
            }
            return `spotify:episode:${val.episode.id}`
        })}
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
            .catch((e) => console.log(e))
            .then((json) => {
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
                    }
                })
                .catch((e) => {
                    console.log(e)
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
                <Button variant="contained" sx={{margin: '1rem'}} disabled>Added to Library</Button>
            }
        </>
    )
}