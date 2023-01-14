// TODO: PRIORITY - Use stable endpoints to fetch users saved shows, then fetch episodes for those shows. (Fetching user's saved shows is beta endpoint)
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
    
    // get a chunk of songs and episodes to fill the user's specified time for songs (this is using the bangers only approach for now by grabbing user's top 50 songs, but you can do more if you use tracks endpoint for recommendations based on seed track)
    const getFromSpotify = async () => {
        const showList = await fetch(`${baseSpotifyURL}/me/shows?limit=50`, getSongsInit)
            .then((val)=>val.json())
            .catch((err) => err)
        const fetchList = showList.map((val) => {
            return fetch(`${baseSpotifyURL}/shows/${val.id}/episodes`, getSongsInit).catch((err) => err)
        })
        Promise.all([
            fetch(`${baseSpotifyURL}/me/top/tracks?limit=50`, getSongsInit).catch((err) => err), 
            ...fetchList
        ])
        .then((res) => Promise.all(res.map((val) => {
            if (val.status !== 200) {
                navigate('/error')
            }
            return val.json()
        })))
        .then((arr) => {
            let episodeList = []
            arr.slice(1).forEach((show) => {
                show.forEach((episode) => {
                    episodeList.push(episode)
                })
            })
            setFetchedItems({
                'songList': arr[0]
                , 'episodeList': episodeList
            })
        })
    }

    useEffect(() => {
        getFromSpotify()
        // eslint-disable-next-line
    }, [userConfig])

    return(
        <>
        </>
    )
}