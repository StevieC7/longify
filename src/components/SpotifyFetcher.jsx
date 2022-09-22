// TODO: Fetch more songs so it can make really long playlists

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SpotifyFetcher({userConfig, setFetchedItems}) {
    const navigate = useNavigate()
    const baseSpotifyURL = 'https://api.spotify.com/v1'
    const spotifyToken = localStorage.getItem('accessToken')
    const getSongsInit = {
        headers: {
            'Authorization': `Bearer ${spotifyToken}`,
            'Content-Type': 'application/json'
        }
    }
    
    // get a chunk of songs to fill the user's specified time for songs (this is using the bangers only approach for now by grabbing user's top 50 songs, but you can do more if you use tracks endpoint for recommendations based on seed track)
    const getFromSpotify = () => {
        Promise.all([
            fetch(`${baseSpotifyURL}/me/top/tracks?limit=50`, getSongsInit).catch((err) => err), 
            fetch(`${baseSpotifyURL}/me/episodes?limit=50`, getSongsInit).catch((err) => err)
        ])
        .then((res) => Promise.all(res.map((val) => {
            if (val.status !== 200) {
                navigate('/error')
            }
            return val.json()
        })))
        .then((arr) => {setFetchedItems({'songList': arr[0], 'episodeList': arr[1]})}
        )
    }

    useEffect(() => {
        getFromSpotify()
        // eslint-disable-next-line
    }, [userConfig])


    // get a chunk of shows to fill the user's specified time for shows

    
    return(
        <>
        </>
    )
}