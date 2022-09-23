import { useState } from "react";
import PlaylistGenerator from "./PlaylistGenerator";
import SpotifyFetcher from "./SpotifyFetcher";
import { Button } from "@mui/material";
import PlaylistActions from "./PlaylistActions";
import PlaylistItems from "./PlaylistItems";
import PlaylistSummary from "./PlaylistSummary";

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
            <Button variant='outlined' sx={{margin: '1rem', backgroundColor: '#B07BAC', color: '#DFE0DC', borderColor: '#DFE0DC', '&:hover': {backgroundColor: '#B07BAC', color: 'white', borderColor: 'white'}}} onClick={() => reconfig()}>Make Another</Button>
            <PlaylistActions playlist={playlist} setPlaylist={setPlaylist} userConfig={userConfig}/>
        </div>
        <PlaylistSummary playlist={playlist} />
        <PlaylistItems playlist={playlist} />
        <div className="spotify-attribution">
            <img src={`${process.env.PUBLIC_URL}/Spotify_Logo_RGB_Black.png`} className="spotify-logo" alt="spotify-logo"></img>
            <p>All metadata provided by Spotify. Longify does not claim the rights to any of this content.</p>
        </div>
        </>
    )
}