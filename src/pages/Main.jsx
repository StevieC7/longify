import { useState } from "react";
import Configurator from "../components/Configurator";
import PlaylistPreview from "../components/PlaylistPreview";

export default function Main(props) {
    const [userConfig, setUserConfig] = useState({})
    
    return(
    <>
        {
            userConfig.songMix !== undefined ? 
            <PlaylistPreview userConfig={userConfig} setUserConfig={setUserConfig}/> 
            : 
            <></>
        }
        {
            userConfig.songMix === undefined ? 
            <Configurator setUserConfig={setUserConfig}/> 
            : 
            <></>
        }
    </>
    )
}