import Configurator from "../components/Configurator";
import PlaylistPreview from "../components/PlaylistPreview";

export default function Main(props) {
    console.log("Main page has token:",localStorage.getItem('accessToken'))
    return(
    <>
        <p>Main</p>
        <Configurator />
        <PlaylistPreview />
    </>
    )
}