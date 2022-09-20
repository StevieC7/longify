// import { useEffect } from "react";

export default function PlaylistGenerator({userConfig, fetchedItems, setPlaylist}) {
    console.log(fetchedItems)
    if (fetchedItems.songList.length === 0) {
        return(
            <p>Loading</p>
        )
    }

    // split the time allocation and set it for songs and shows respectively
    const songLength = Math.ceil(0.01 * userConfig.songMix * userConfig.playLength * 60)
    const showLength = (userConfig.playLength * 60) - songLength
    console.log("Desired percent songs:",userConfig.songMix)
    console.log("Desired length of play in minutes:", userConfig.playLength * 60)
    console.log("Total song playtime in minutes:",songLength)
    console.log("Total show playtime in minutes:", showLength)
    
    let finalSongList = [];
    let finalEpisodeList = [];
    
    // inside each track, target key is duration_ms
    // useEffect(() => {
    // const buildTrackList = () => {
        let clonedSongs = [...fetchedItems.songList.items]
        console.log('clonedSongs:',clonedSongs)
        let songsLengthRunning = 0;
        while (songsLengthRunning < songLength * 1000 * 60) {
            songsLengthRunning += clonedSongs[0].duration_ms
            finalSongList.push(clonedSongs[0])
            clonedSongs.shift()
        }
        console.log(finalSongList)
        let clonedEpisodes = [...fetchedItems.episodeList.items]
        let episodesRunningLength = 0;
        while (episodesRunningLength < showLength * 1000 * 60) {
            episodesRunningLength += clonedEpisodes[0].episode.duration_ms
            finalEpisodeList.push(clonedEpisodes[0])
            clonedEpisodes.shift()
        }
        console.log(finalEpisodeList)
    // }

        // buildTrackList()
        // getFromSpotify()
        // eslint-disable-next-line
    // }, [fetchedItems])

    // get a chunk of shows to fill the user's specified time for shows

    
    return(
        <>
        </>
    )
}