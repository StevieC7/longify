import { useState } from "react";
import PlaylistActions from "./PlaylistActions";
import PlaylistGenerator from "./PlaylistGenerator";

export default function PlaylistPreview({userConfig}) {
    const [playlist, setPlaylist] = useState(null)
    return(
        <>
            <PlaylistGenerator userConfig={userConfig} playlist={playlist} setPlaylist={setPlaylist}/>
            <PlaylistActions />
        </>
    )
}