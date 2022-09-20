import { useState } from "react";
import PlaylistGenerator from "./PlaylistGenerator";
import SpotifyFetcher from "./SpotifyFetcher";

export default function PlaylistPreview({userConfig}) {
    const [fetchedItems, setFetchedItems] = useState({songList: [], episodeList: []})
    const [playlist, setPlaylist] = useState([])

    return(
        <>
        <SpotifyFetcher userConfig={userConfig} setFetchedItems={setFetchedItems}/>
        {playlist.length < 1 ? <PlaylistGenerator userConfig={userConfig} fetchedItems={fetchedItems} setPlaylist={setPlaylist}/> : <></>}
        <div className="playlist">
            {playlist.map((val) => {return(
                <p>{val.name ? val.name : val.episode.name}</p>
            )})}
        </div>
        </>
    )
}