import { useState } from "react";
import Configurator from "../components/Configurator";
import Header from "../components/Header";
import PlaylistPreview from "../components/PlaylistPreview";

export default function Main(props) {
    const [userConfig, setUserConfig] = useState({})
    
    return(
    <>
    <Header />
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