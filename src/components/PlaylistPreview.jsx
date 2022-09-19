import { useState, useEffect } from "react";
import PlaylistActions from "./PlaylistActions";
import PlaylistGenerator from "./PlaylistGenerator";

export default function PlaylistPreview({userConfig}) {
    const [playlist, setPlaylist] = useState([])

    useEffect(() => {
        console.log(playlist)
    }, [playlist])
    return(
        <>
            <PlaylistGenerator userConfig={userConfig} playlist={playlist} setPlaylist={setPlaylist}/>
            {playlist.length > 0 ? playlist.map((val) => {return(
                <p>{val.name}</p>
            )}) : <p>No Playlist</p> }
            <PlaylistActions />
        </>
    )
}