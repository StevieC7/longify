import { useEffect } from "react";

export default function PlaylistGenerator({userConfig, playlist, setPlaylist}) {
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
    let gotSongs;
    let songList = [];
    
    const getSongs = () => {
        fetch(`${baseSpotifyURL}/me/top/tracks?limit=50`, getSongsInit)
        .then((res) => res.json())
        // .then((json) => console.log(json.items))
        .then((json) => {gotSongs = json.items})
        // buildSongList()
        // .then((json) => setPlaylist(json.items))
        .catch((err) => console.log(err))
    }
    
    // inside each track, target key is duration_ms
    const buildSongList = async () => {
        await getSongs()
        console.log(gotSongs)
        let songsLengthRunning = 0;
        while (songsLengthRunning < songLength * 1000 * 60) {
            songsLengthRunning += gotSongs[0].duration_ms
            songList.push(gotSongs[0])
            gotSongs.shift()
        }
        console.log(songList)
    }

    useEffect(() => {
        buildSongList()
        console.log("Gotsongs:",gotSongs)
        // eslint-disable-next-line
    }, [userConfig])

    // get a chunk of shows to fill the user's specified time for shows

    
    return(
        <>
            {playlist.length > 0 ? <p>Playlist Loading...</p> : <p>Playlist goes here</p>}
        </>
    )
}