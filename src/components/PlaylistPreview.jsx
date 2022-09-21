import { useState } from "react";
import PlaylistGenerator from "./PlaylistGenerator";
import SpotifyFetcher from "./SpotifyFetcher";
import { Button } from "@mui/material";
import PlaylistActions from "./PlaylistActions";

export default function PlaylistPreview({userConfig, setUserConfig}) {
    const [fetchedItems, setFetchedItems] = useState({songList: [], episodeList: []})
    const [playlist, setPlaylist] = useState([])

        
    const reconfig = () => {
        setUserConfig({})
    }

    return(
        <>
        <SpotifyFetcher userConfig={userConfig} setFetchedItems={setFetchedItems}/>
        {playlist.length < 1 ? <PlaylistGenerator userConfig={userConfig} fetchedItems={fetchedItems} setPlaylist={setPlaylist}/> : <></>}
        <div className="stickytop">
            <Button variant='outlined' sx={{margin: '2rem', backgroundColor: '#B07BAC', color: '#DFE0DC', borderColor: '#DFE0DC', '&:hover': {backgroundColor: '#B07BAC', color: 'white', borderColor: 'white'}}} onClick={() => reconfig()}>Reconfigure</Button>
            <PlaylistActions playlist={playlist} setPlaylist={setPlaylist} userConfig={userConfig}/>
        </div>
        <div className="playlist">
            {playlist.map((val, key) => {return(val.name ? <p key={key}>{val.name}</p> : <p key={key}>{val.episode.name}</p>)})}
        </div>
        </>
    )
}