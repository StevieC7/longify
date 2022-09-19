export default function PlaylistGenerator({userConfig, playlist, setPlaylist}) {
    // split the time allocation and set it for songs and shows respectively
    // get a chunk of songs to fill the user's specified time for songs
    // get a chunk of shows to fill the user's specified time for shows
    console.log(userConfig.songMix)
    console.log(playlist)
    return(
        <>
            {playlist === null ? <p>Playlist Loading...</p> : <p>Playlist goes here</p>}
        </>
    )
}