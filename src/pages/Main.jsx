import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Configurator from "../components/Configurator";
import PlaylistPreview from "../components/PlaylistPreview";
import PlaylistActions from "../components/PlaylistActions";

export default function Main(props) {
    const [userConfig, setUserConfig] = useState({})
    console.log("Main page has token:",localStorage.getItem('accessToken'))
    
    const reconfig = () => {
        setUserConfig({})
    }
    
    useEffect(() => {
        console.log(userConfig)
    }, [userConfig])
    
    return(
    <>
        {userConfig.songMix !== undefined ? 
        <>
        <div className="stickytop">
            <Button variant='outlined' onClick={() => reconfig()}>Reconfigure</Button>
            <PlaylistActions />
        </div>
        <PlaylistPreview userConfig={userConfig}/> 
        </>
        : 
        <></>
        }
        {userConfig.songMix === undefined ? <Configurator setUserConfig={setUserConfig}/> : <></>}
    </>
    )
}