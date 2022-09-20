import { useState, useEffect } from "react";
import PlaylistActions from "./PlaylistActions";
import PlaylistGenerator from "./PlaylistGenerator";
import SpotifyFetcher from "./SpotifyFetcher";

export default function PlaylistPreview({userConfig}) {
    const [fetchedItems, setFetchedItems] = useState({songList: [], episodeList: []})
    const [playlist, setPlaylist] = useState([])

    // useEffect(() => {
    //     console.log(playlist)
    //     console.log(fetchedItems)
    // }, [playlist, fetchedItems])
    return(
        <>
            <SpotifyFetcher userConfig={userConfig} setFetchedItems={setFetchedItems}/>
            <PlaylistGenerator userConfig={userConfig} fetchedItems={fetchedItems} setPlaylist={setPlaylist}/>
            {playlist.length > 0 ? playlist.map((val) => {return(
                <p>{val.name}</p>
            )}) : <p>No Playlist</p> }
            <PlaylistActions />
        </>
    )
}