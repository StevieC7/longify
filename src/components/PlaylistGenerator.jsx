export default function PlaylistGenerator({userConfig, playlist, setPlaylist}) {
    // const baseSpotifyURL = 'https://api.spotify.com/v1/'
    // split the time allocation and set it for songs and shows respectively
    // get a chunk of songs to fill the user's specified time for songs
    // get a chunk of shows to fill the user's specified time for shows
    const songLength = Math.ceil(0.01 * userConfig.songMix * userConfig.playLength * 60)
    const showLength = (userConfig.playLength * 60) - songLength
    console.log("Desired percent songs:",userConfig.songMix)
    console.log("Desired length of play in minutes:", userConfig.playLength * 60)
    console.log("Total song playtime in minutes:",songLength)
    console.log("Total show playtime in minutes:", showLength)

    return(
        <>
            {playlist === null ? <p>Playlist Loading...</p> : <p>Playlist goes here</p>}
        </>
    )
}