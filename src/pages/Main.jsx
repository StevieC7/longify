import { useState, useEffect } from "react";
import Configurator from "../components/Configurator";
import PlaylistPreview from "../components/PlaylistPreview";

export default function Main(props) {
    const [userConfig, setUserConfig] = useState({})
    console.log("Main page has token:",localStorage.getItem('accessToken'))
    useEffect(() => {
        console.log(userConfig)
    }, [userConfig])
    return(
    <>
        <Configurator setUserConfig={setUserConfig}/>
        {userConfig.songMix !== undefined ? <PlaylistPreview userConfig={userConfig}/> : <></>}
    </>
    )
}