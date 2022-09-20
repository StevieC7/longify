import { useEffect } from "react";

export default function SpotifyFetcher({userConfig, setFetchedItems}) {
    
    const baseSpotifyURL = 'https://api.spotify.com/v1'
    const spotifyToken = localStorage.getItem('accessToken')
    const getSongsInit = {
        headers: {
            'Authorization': `Bearer ${spotifyToken}`,
            'Content-Type': 'application/json'
        }
    }
    console.log(`base spotify url: ${baseSpotifyURL}, spotifyToken: ${spotifyToken}`)
    // split the time allocation and set it for songs and shows respectively
    const songLength = Math.ceil(0.01 * userConfig.songMix * userConfig.playLength * 60)
    const showLength = (userConfig.playLength * 60) - songLength
    console.log("Desired percent songs:",userConfig.songMix)
    console.log("Desired length of play in minutes:", userConfig.playLength * 60)
    console.log("Total song playtime in minutes:",songLength)
    console.log("Total show playtime in minutes:", showLength)
    
    // get a chunk of songs to fill the user's specified time for songs (this is using the bangers only approach for now by grabbing user's top 50 songs, but you can do more if you use tracks endpoint for recommendations based on seed track)
    const getFromSpotify = () => {
        Promise.all([
            fetch(`${baseSpotifyURL}/me/top/tracks?limit=50`, getSongsInit), 
            fetch(`${baseSpotifyURL}/me/episodes?limit=50`, getSongsInit)
        ])
        .then((res) => Promise.all(res.map((val) => val.json())))
        // .then(arr => console.log(arr))
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