export default function PlaylistGenerator({userConfig, fetchedItems, setPlaylist}) {
    if (fetchedItems.songList.length === 0) {
        return(
            <p>Loading</p>
        )
    }

    // split the time allocation and set it for songs and shows respectively
    const songLength = Math.ceil(0.01 * userConfig.songMix * userConfig.playLength * 60)
    const showLength = (userConfig.playLength * 60) - songLength
    
    let finalSongList = [];
    let finalEpisodeList = [];
    
    // have to clone songs because it's a state item
    let clonedSongs = [...fetchedItems.songList.items]
    let songsLengthRunning = 0;
    let episodesRunningLength = 0;
    
    // use while loops to fill the user's desired length for each type of media
    while (songsLengthRunning < songLength * 1000 * 60) {
        if (clonedSongs.length > 0) {
            songsLengthRunning += clonedSongs[0].duration_ms
            finalSongList.push(clonedSongs[0])
            clonedSongs.shift()
        } else {
            songsLengthRunning += finalSongList[0].duration_ms
            finalSongList.push(finalSongList[Math.floor(Math.random()*finalSongList.length)])
        }
    }
    let clonedEpisodes;
    if (fetchedItems.episodeList.items) {
       clonedEpisodes = [...fetchedItems.episodeList.items]
    } else {
        clonedEpisodes = [...fetchedItems.episodeList.tracks]
    }
    while (episodesRunningLength < showLength * 1000 * 60) {
        if (clonedEpisodes.length > 0) {
            episodesRunningLength += clonedEpisodes[0].episode.duration_ms
            finalEpisodeList.push(clonedEpisodes[0])
            clonedEpisodes.shift()
        } else {
            episodesRunningLength += finalEpisodeList[0].duration_ms
            finalEpisodeList.push(finalEpisodeList[Math.floor(Math.random()*finalEpisodeList.length)])
        }
    }

    let finalPlaylistArray = [];

    function episodesFirst() {
        for (let i = 0; i < finalEpisodeList.length; i++) {
            finalPlaylistArray.push(finalEpisodeList[i])
        }
        for (let i = 0; i < finalSongList.length; i++) {
            finalPlaylistArray.push(finalSongList[i])
        }
    }
    
    function altEpisodesFirst() {
        let initialEpisodeCount = finalEpisodeList.length
        while (finalSongList.length > 0 || finalEpisodeList.length > 0) {
            let fillTime;
            let runningFillTime;
            if (finalEpisodeList.length > 0) {
                fillTime = songLength / initialEpisodeCount * 1000 * 60
                runningFillTime = 0;
                finalPlaylistArray.push(finalEpisodeList[0])
                finalEpisodeList.shift()
            }
            if (finalSongList.length > 0 && finalEpisodeList.length < 1) {
                while (finalSongList.length > 0) {
                    finalPlaylistArray.push(finalSongList[0])
                    finalSongList.shift()
                }
            }
            while (runningFillTime < fillTime) {
                if (finalSongList.length > 0) {
                    runningFillTime += finalSongList[0].duration_ms
                    finalPlaylistArray.push(finalSongList[0])
                    finalSongList.shift()
                } else {
                    runningFillTime = fillTime
                }
            }
        }
    }
    
    function songsFirst() {
        for (let i = 0; i < finalSongList.length; i++) {
            finalPlaylistArray.push(finalSongList[i])
        }
        for (let i = 0; i < finalEpisodeList.length; i++) {
            finalPlaylistArray.push(finalEpisodeList[i])
        }
    }
    
    function altSongsFirst() {
        let initialEpisodeCount = finalEpisodeList.length;
        while (finalSongList.length > 0 || finalEpisodeList.length > 0) {
            let fillTime;
            let runningFillTime;
            if (finalEpisodeList.length > 0) {
                fillTime = songLength / initialEpisodeCount * 1000 * 60
                runningFillTime = 0;
            }
            if (finalSongList.length > 0 && finalEpisodeList.length < 1) {
                while (finalSongList.length > 0) {
                    finalPlaylistArray.push(finalSongList[0])
                    finalSongList.shift()
                }
            }
            while (runningFillTime < fillTime) {
                if (finalSongList.length > 0) {
                    runningFillTime += finalSongList[0].duration_ms
                    finalPlaylistArray.push(finalSongList[0])
                    finalSongList.shift()
                } else {
                    runningFillTime = fillTime
                }
            }
            if (finalEpisodeList.length > 0) {
                finalPlaylistArray.push(finalEpisodeList[0])
                finalEpisodeList.shift()
            }
        }     
    }

    function sortSongs(sortMethod) {
        if (sortMethod === 'episodesFirst') {
            return episodesFirst()
        }
        if (sortMethod === 'songsFirst') {
            return songsFirst()
        }
        if (sortMethod === 'altEpisodesFirst') {
            return altEpisodesFirst()
        }
        if (sortMethod === 'altSongsFirst') {
            return altSongsFirst()
        }
    }
    
    async function generateFinal() {
        await sortSongs(userConfig.sortMethod)
        setPlaylist(finalPlaylistArray)
    }
    generateFinal()
    return(<></>)
}